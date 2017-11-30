import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-edit-subdir',
    templateUrl: './create-or-edit-subdir.component.html',
    styleUrls: ['./create-or-edit-subdir.component.scss'],
    animations: [appModuleSlowAnimation()]
    
})
export class CreateOrEditSubdirComponent extends AppComponentBase implements OnInit {
    imgListRightColumn: string[] = [];
    imgListLeftColumn: string[] = [];
    wxScanQRCodeInfoDirItem: any;
    // 目录item的ID
    dirItemId: string;
    // 目录ID
    dirId: string;
    // 保存目录条目的某个索引值，获取本地扫码数据的某个条目
    dirItemIndex: string;

    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
        private _localStorageService: LocalStorageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.dirItemIndex = this._route.snapshot.paramMap.get('dirItemIndex');
        this.dirId = this._route.snapshot.paramMap.get('dirId');
        this.dirItemId = this._route.snapshot.paramMap.get('dirItemId');

        this.loadData();
    }

    loadData(): void {
        if (this.checkIsCreateOrEditCatalogueState()) {
            this._localStorageService.getItemOrNull('wxScanQRCodeInfoList').then(result => {
                if (!result) {
                    this.message.warn("未检测到数据");
                    return;
                }
                this.wxScanQRCodeInfoDirItem = result[this.dirItemIndex];
                console.log(this.wxScanQRCodeInfoDirItem);
                
                this.transferWaterFallData(this.wxScanQRCodeInfoDirItem);
            })
        }
    }

    /* 
        将图片数据转换为两个数组，分为两列，数组索引奇数为左边瀑布流，偶数为右边瀑布流
     */
    private transferWaterFallData(data: any): void {
        data.imgUrlList.forEach((element, inx) => {
            // 为零则偶数，反之为奇数
            if (inx % 2) {
                this.imgListLeftColumn.push(element);
            } else {
                this.imgListRightColumn.push(element);
            }
        });
    }

    /* 
        检测状态: 判断是编辑本地扫码的目录条目还是线上的已有目录条目
        @return boolean
        编辑本地扫码数据: true
        编辑线上数据: false
    */
    private checkIsCreateOrEditCatalogueState(): boolean {

        if (this.dirItemIndex) {
            return true;
        } else if (this.dirId && this.dirItemId) {
            return false;
        }
    }

}
