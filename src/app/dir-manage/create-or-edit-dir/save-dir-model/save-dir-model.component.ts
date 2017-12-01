import { Component, OnInit, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ScanServiceProxy, PagedResultDtoOfCatalogListDto, CatalogListDto, CreateOrUpdateCatalogInput, ScanRecordListDto } from 'shared/service-proxies/service-proxies';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { AppConsts } from 'shared/AppConsts';

@Component({
    selector: 'yaojiangjie-save-dir-model',
    templateUrl: './save-dir-model.component.html',
    styleUrls: ['./save-dir-model.component.scss']
})
export class SaveDirModelComponent extends AppComponentBase implements OnInit {
    allDirIds: number[] = [];
    selectedDirId: number;
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
        this.checkIsSave2ExistedDir();
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
        // TODO: 临时设置
        this.catalogInput.sticked = false;
        this._scanServiceProxy
        .createOrUpdateCatalog(this.catalogInput).subscribe( result => {
            this.hideModel();
            this._localStorageService.removeItem("allDirSelectData");
            this._localStorageService.removeItem("wxScaenQRCodeInfoList");
        });
    }

    // 检测是否保存到已存在的目录
    checkIsSave2ExistedDir(): void {
        if (!this.isShowExistedDirFlag) {
            this.catalogInput.save2ExistedCatalog = false;
            this.catalogInput.scanRecords = this.allDirIds;
        } else {
            this.catalogInput.save2ExistedCatalog = true;
            this.catalogInput.id = this.selectedDirId;
        }
    }

    getSelectedDirId(dirId: number): void {
        this.selectedDirId = dirId;
    }

    // 获取已存在目录的高度
    getExistedDirHeight(): string {
        if (this.isShowExistedDirFlag) {
            return this.allDirSelectData.length * 44 + 'px';
        }
        return '0px';
    }

    // 获取所有未保存目录的id
    private getAllDirItemId(data: ScanRecordListDto[]): number[] {
        let ids = [];
        data.forEach(element => {
            ids.push(element.id);
        });
        return ids;
    }
}
