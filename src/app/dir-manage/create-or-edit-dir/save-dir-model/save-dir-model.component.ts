import { Component, OnInit, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ScanServiceProxy, PagedResultDtoOfCatalogListDto, CatalogListDto, CreateOrUpdateCatalogInput, ScanRecordListDto } from 'shared/service-proxies/service-proxies';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { AppConsts } from 'shared/AppConsts';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'yaojiangjie-save-dir-model',
    templateUrl: './save-dir-model.component.html',
    styleUrls: ['./save-dir-model.component.scss']
})
export class SaveDirModelComponent extends AppComponentBase implements OnInit {
    catalogInputName: string;
    selectedDirIndex: number;
    allDirIds: number[] = [];
    selectedDirItem: CatalogListDto = new CatalogListDto();
    catalogInput: CreateOrUpdateCatalogInput = new CreateOrUpdateCatalogInput();
    allDirSelectData: CatalogListDto[] = [];

    /* 获取所有目录DTO */
    dirName: string;
    skipCount: number = 0;
    maxResultCount: number = AppConsts.grid.defaultPageSize;
    sorting: string;

    isShowExistedDirFlag: boolean = false;
    @ViewChild('saveDirModel') saveDirModel: ModalDirective;
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
    }

    public showModel(result: ScanRecordListDto[]): void {
        this.getAllDir();
        this.allDirIds = this.getAllDirItemId(result);
        this.saveDirModel.show();
    }

    public hideModel(): void {
        this.saveDirModel.hide();
    }

    /* 
        是否显示已有目录
        显示：true
        隐藏：false    
     */
    toggleShowExistedDir(): void {
        this.isShowExistedDirFlag = !this.isShowExistedDirFlag;
        this.checkIsSave2ExistedDir();
    }

    // 获取所有目录
    getAllDir(): void {
        this._localStorageService.getItem('allDirSelectData', () => {
            return this._scanServiceProxy
                .getAllCatalog(
                this.dirName,
                this.sorting,
                this.maxResultCount,
                this.skipCount
                )
        }).then((result: PagedResultDtoOfCatalogListDto) => {
            console.log(result);
            this.allDirSelectData = result.items;
        })
    }

    saveDirData(): void {
        // 编辑状态下，只对目录名更新
        if (!this.checkIsCreateOrEditState()) {
            this.catalogInput.id = +this._route.snapshot.paramMap.get('dirId');
            this.catalogInput.name = this.catalogInputName;
            this.catalogInput.save2ExistedCatalog = false;
            this.catalogInput.scanRecords = [];
            this.catalogInput.sticked = false;
        }
        this._scanServiceProxy
            .createOrUpdateCatalog(this.catalogInput).subscribe(result => {
                this.hideModel();
                this._localStorageService.removeItem("allDirSelectData");
                this._localStorageService.removeItem("wxScaenQRCodeInfoList");
                this._router.navigate(['/looked-exhibit']);
            });
    }

    getSelectedDirInfo(dirItem: CatalogListDto, index: number): void {
        this.selectedDirIndex = index;
        this.selectedDirItem = dirItem;
        this.checkIsSave2ExistedDir();
    }

    // 获取已存在目录的高度
    getExistedDirHeight(): string {
        if (this.isShowExistedDirFlag) {
            return this.allDirSelectData.length * 44 + 'px';
        }
        return '0px';
    }

    /* 
    检测状态: 判断是否是创建全新目录还是编辑已有目录
    @return boolean
    createState: true
    editState: false
*/
    private checkIsCreateOrEditState(): boolean {
        return this._route.snapshot.paramMap.get('dirId') ? false : true;
    }

    // 获取所有未保存目录的id
    private getAllDirItemId(data: ScanRecordListDto[]): number[] {
        let ids = [];
        data.forEach(element => {
            ids.push(element.id);
        });
        return ids;
    }

    // 检测是否保存到已存在的目录
    private checkIsSave2ExistedDir(): void {
        if (!this.isShowExistedDirFlag) {
            this.catalogInput.sticked = false;
            this.catalogInput.id = null;
            this.catalogInput.name = this.catalogInputName;
            this.catalogInput.save2ExistedCatalog = false;
            this.catalogInput.scanRecords = this.allDirIds;
        } else {
            this.catalogInput.save2ExistedCatalog = true;
            this.catalogInput.id = this.selectedDirItem.id;
            this.catalogInput.name = this.selectedDirItem.name;
            this.catalogInput.sticked = this.selectedDirItem.sticked;
            this.catalogInput.scanRecords = this.allDirIds;
        }
    }
}
