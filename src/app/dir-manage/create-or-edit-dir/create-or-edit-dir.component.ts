import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'shared/utils/local-storage.service';

@Component({
    selector: 'yaojiangjie-create-or-edit-dir',
    templateUrl: './create-or-edit-dir.component.html',
    styleUrls: ['./create-or-edit-dir.component.scss']
})
export class CreateOrEditDirComponent extends AppComponentBase implements OnInit {
    touchedListType: boolean[] = [];
    touchedEndX: number;
    // touch起始位置
    touchedStartX: number;
    /* 微信扫码保存的数据 */
    wxScanQRCodeInfoList: any;
    /* 获取目录ID */
    dirId: string;

    constructor(
        private injector: Injector,
        private _router: Router,
        private _route: ActivatedRoute,
        private _lcalStorageService: LocalStorageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.loadData();
        document.addEventListener('touchstart', () => {
            this.onTouchResetState();
        })
    }

    /* 获取数据 */
    loadData(): void {
        if (this.checkIsCreateOrEditState()) {
            // 创建状态则获取localstorage的数据（扫码后将分析的数据保存localstorage中）
            // localstorageKey为"wxScanQRCodeInfoList"
            /*             this._lcalStorageService.getItem('wxScanQRCodeInfoList', (err, result) => {
                            console.log(err);
                            console.log(result);
                            if (!err) {
                                this.message.warn("未检测到数据");
                                return;
                            }
                            this.wxScanQRCodeInfoList = result;
                        }) */
            let result = localStorage.getItem('wxScanQRCodeInfoList');

            if (!result) {
                this.message.warn("未检测到数据");
                return;
            }
            this.wxScanQRCodeInfoList = JSON.parse(result);
        }
    }

    onTouchInit(event: TouchEvent): void {
        this.touchedStartX = event.changedTouches[0].pageX;
        this.onTouchResetState();
    }

    onTouchMove(event: TouchEvent, index: number): void {
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