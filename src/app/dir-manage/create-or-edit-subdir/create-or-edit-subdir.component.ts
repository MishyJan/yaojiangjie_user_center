import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { ScanServiceProxy, GetRecordForEditOutput, CreateOrUpdateRecordInput } from 'shared/service-proxies/service-proxies';
import { LocalStorageService } from 'shared/services/local-storage.service';

@Component({
    selector: 'yaojiangjie-edit-subdir',
    templateUrl: './create-or-edit-subdir.component.html',
    styleUrls: ['./create-or-edit-subdir.component.scss'],
    animations: [appModuleSlowAnimation()]

})
export class CreateOrEditSubdirComponent extends AppComponentBase implements OnInit {
    recordInput: CreateOrUpdateRecordInput = new CreateOrUpdateRecordInput();
    wxScanQRCodeInfoDirItem: GetRecordForEditOutput = new GetRecordForEditOutput();
    imgListRightColumn: string[] = [];
    imgListLeftColumn: string[] = [];
    // 目录item的ID
    dirItemId: string;
    // 目录ID
    dirId: string;

    // 保存被选中的图片
    selectedCoverUrl: string;

    constructor(
        private injector: Injector,
        private _location: Location,
        private _route: ActivatedRoute,
        private _localStorageService: LocalStorageService,
        private _scanServiceProxy: ScanServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.dirId = this._route.snapshot.paramMap.get('dirId');
        this.dirItemId = this._route.snapshot.paramMap.get('dirItemId');

        this.loadData();
    }

    loadData(): void {
        this._scanServiceProxy
            .getRecordForEdit(+this.dirItemId)
            .subscribe(result => {
                this.wxScanQRCodeInfoDirItem = result;
                this.selectedCoverUrl = result.coverUrl;
                this.transferWaterFallData(this.wxScanQRCodeInfoDirItem);
            })
    }

    saveData(): void {
        this.recordInput = this.wxScanQRCodeInfoDirItem;
        this.recordInput.catalogId = null;
        this.recordInput.coverUrl = this.selectedCoverUrl;
        this._scanServiceProxy
        .createOrUpdateRecord(this.recordInput)
        .subscribe( result => {
            this.message.success('保存成功!');
            this._location.back();
        });
    }

    selectedCoverImgHandle(imgUrl: string): void {
        this.selectedCoverUrl = imgUrl;
    }

    /* 
        将图片数据转换为两个数组，分为两列，数组索引奇数为右边瀑布流，偶数为左边瀑布流
     */
    private transferWaterFallData(data: GetRecordForEditOutput): void {
        data.images.forEach((element, inx) => {
            // 为零则偶数，反之为奇数
            if (inx % 2) {
                this.imgListRightColumn.push(element);
            } else {
                this.imgListLeftColumn.push(element);
            }
        });
    }
}
