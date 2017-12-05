import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { ScanServiceProxy, PagedResultDtoOfScanRecordListDto, ScanRecordListDto, BatchDeleteInput, CreateOrUpdateCatalogInput, CreateOrUpdateRecordInput } from 'shared/service-proxies/service-proxies';
import { AppConsts } from 'shared/AppConsts';
import { SaveDirModelComponent } from 'app/dir-manage/create-or-edit-dir/save-dir-model/save-dir-model.component';

@Component({
    selector: 'yaojiangjie-create-or-edit-dir',
    templateUrl: './create-or-edit-dir.component.html',
    styleUrls: ['./create-or-edit-dir.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class CreateOrEditDirComponent extends AppComponentBase implements OnInit {
    scanRecordIds: BatchDeleteInput = new BatchDeleteInput();
    wxScanQRCodeInfoList: ScanRecordListDto[] = []
    recordInput: CreateOrUpdateRecordInput = new CreateOrUpdateRecordInput();

    /* getRecordScan获取扫描记录DTO */
    skipCount: number = 0;
    maxResultCount: number = AppConsts.grid.defaultPageSize;
    sorting: string;
    name: string;
    calalogId: number;

    touchedListType: boolean[] = [];
    touchedEndX: number;
    // touch起始位置
    touchedStartX: number;
    /* 获取目录ID */
    dirId: string;

    @ViewChild('saveDirModel') saveDirModel: SaveDirModelComponent;

    constructor(
        private injector: Injector,
        private _router: Router,
        private _route: ActivatedRoute,
        private _scanServiceProxy: ScanServiceProxy,
        private _localStorageService: LocalStorageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.loadData();
        document.addEventListener('click', (event: Event) => {
            this.onTouchResetState();
        })
    }

    /* 获取数据 */
    loadData(): void {
        if (this.checkIsCreateOrEditState()) {
            this._localStorageService.getItem('wxScaenQRCodeInfoList', () => {
                return this._scanServiceProxy.getRecords(
                    this.calalogId,
                    this.name,
                    this.sorting,
                    this.maxResultCount,
                    this.skipCount
                )
            }).then((result: PagedResultDtoOfScanRecordListDto) => {
                this.wxScanQRCodeInfoList = result.items;
                this.checkHasScanRecord();
            })
        } else {
            this.calalogId = +this.dirId;
            this._scanServiceProxy.getRecords(
                this.calalogId,
                this.name,
                this.sorting,
                this.maxResultCount,
                this.skipCount
            ).subscribe( result => {
                this.wxScanQRCodeInfoList = result.items;
                this.checkHasScanRecord();
            })
        }
    }

    onTouchInit(event: TouchEvent): void {
        this.touchedStartX = event.changedTouches[0].pageX;
        this.onTouchResetState();
    }

    onTouchMove(event: TouchEvent, index: number): void {
        event.stopPropagation();
        event.cancelBubble = true;
        this.touchedEndX = event.changedTouches[0].pageX;
        let diffX = this.touchedEndX - this.touchedStartX;
        if (diffX > 0) {
            this.touchedListType[index] = false;
        } else {
            this.touchedListType[index] = true;
        }

    }

    // 编辑目录条目详情
    editDirItem(itemId: number): void {
        if (this.checkIsCreateOrEditState()) {
            let url = `/dir-manage/create/dir-item/${itemId}`;
            this._router.navigate([url]);
        } else {
            let url = `/dir-manage/edit/dir-item/${this.dirId}/${itemId}`;
            this._router.navigate([url]);
        }
    }

    // 删除单个目录条目
    deleteDirItem(itemId: number): void {
        this.message.confirm("您是否要删除此条目?", (res) => {
            if (res) {
                this.scanRecordIds.ids[0] = itemId;
                this._scanServiceProxy
                    .batchDelete(this.scanRecordIds)
                    .subscribe(result => {
                        this.message.success("删除成功!");
                        this.scanRecordIds.ids = [];
                        this._localStorageService.removeItem("wxScaenQRCodeInfoList");
                        this.loadData();
                    })
            }
        })
    }

    // 清空所有目录条目
    deleteAllDirItem(): void {
        this.wxScanQRCodeInfoList.forEach(element => {
            this.scanRecordIds.ids.push(element.id);
        });

        this.message.confirm("您是否要删除所有数据?", (res) => {
            if (res) {
                this._scanServiceProxy
                    .batchDelete(this.scanRecordIds)
                    .subscribe(result => {
                        this.message.success("已全部清空!");
                        this.scanRecordIds.ids = [];
                        this._localStorageService.removeItem("wxScaenQRCodeInfoList");
                        this._router.navigate(['/']);
                    })
            }
        })
    }

    // 置顶条目
    toggleStick(index: number): void {
        this.recordInput = new CreateOrUpdateRecordInput();

        this.recordInput.catalogId = this.checkIsCreateOrEditState() ? null : this.wxScanQRCodeInfoList[index].catalogId;
        this.recordInput.coverUrl = this.wxScanQRCodeInfoList[index].coverUrl;
        this.recordInput.id = this.wxScanQRCodeInfoList[index].id;
        this.recordInput.name = this.wxScanQRCodeInfoList[index].name;
        this.recordInput.url = this.wxScanQRCodeInfoList[index].url;
        this.recordInput.sticked = !this.wxScanQRCodeInfoList[index].sticked;
        
        this._scanServiceProxy
        .createOrUpdateRecord(this.recordInput)
        .subscribe( result => {
            this._localStorageService.removeItem("wxScaenQRCodeInfoList");
            this.loadData();
        })
    }

    // 保存目录
    saveDir(): void {
        this.saveDirModel.showModel(this.wxScanQRCodeInfoList);
    }

    // 跳转到展品页
    linkTargetPage(url: string): void {
        this._router.navigate(['/external-exhibit'], {queryParams: {exhibitUrl: url}});
    }

    /* 
        检测状态: 判断是否是创建全新目录还是编辑已有目录
        @return boolean
        createState: true
        editState: false
    */
    public checkIsCreateOrEditState(): boolean {
        this.dirId = this._route.snapshot.paramMap.get('dirId');
        return this.dirId ? false : true;
    }

    // 还原touch后的状态
    private onTouchResetState(): void {
        this.touchedListType.forEach((ele, inx) => {
            this.touchedListType[inx] = false;
        });
    }

    /* 
        检测是否有扫码数据记录
        @return void
    */ 
    private checkHasScanRecord(): void {
        if (this.wxScanQRCodeInfoList.length <= 0) {
            this.message.warn("暂无扫码记录,请扫码!");
            this._router.navigate(['/index']);
        }
    }
}
