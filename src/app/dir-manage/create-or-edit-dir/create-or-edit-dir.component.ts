import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { ScanServiceProxy, PagedResultDtoOfScanRecordListDto, ScanRecordListDto, BatchDeleteInput } from 'shared/service-proxies/service-proxies';
import { AppConsts } from 'shared/AppConsts';

@Component({
    selector: 'yaojiangjie-create-or-edit-dir',
    templateUrl: './create-or-edit-dir.component.html',
    styleUrls: ['./create-or-edit-dir.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class CreateOrEditDirComponent extends AppComponentBase implements OnInit {
    scanRecordIds: BatchDeleteInput[] = [];
    wxScanQRCodeInfoList: ScanRecordListDto[] = []

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
    /* 微信扫码保存的数据 */
    mockWxScanQRCodeInfoList: any;
    /* 获取目录ID */
    dirId: string;

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
                console.log(result);
                this.wxScanQRCodeInfoList = result.items;
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
            console.log("右滑");
            this.touchedListType[index] = false;
        } else {
            console.log("左滑");
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

    // 删除目录条目
    deleteDirItem(itemId: number): void {
        console.log(itemId);
        
        this.message.confirm("您是否要删除此条目?", (res) => {
            if (res) {
                this.scanRecordIds[0] = itemId;
                this._scanServiceProxy
                    .batchDelete(this.scanRecordIds)
                    .subscribe(result => {
                        this.message.success("删除成功!");
                    })
            }
        })
    }

    // 还原touch后的状态
    private onTouchResetState(): void {
        this.touchedListType.forEach((ele, inx) => {
            this.touchedListType[inx] = false;
        });
    }

    /* 
        检测状态: 判断是否是创建全新目录还是编辑已有目录
        @return boolean
        createState: true
        editState: false
    */
    private checkIsCreateOrEditState(): boolean {
        this.dirId = this._route.snapshot.paramMap.get('dirId');
        return this.dirId ? false : true;
    }

}
