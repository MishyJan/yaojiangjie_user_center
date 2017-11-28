import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { LocalStorageService } from 'shared/utils/local-storage.service';

@Component({
    selector: 'yaojiangjie-wxScanQRCodePage',
    templateUrl: './wxScanQRCodePage.component.html',
    styleUrls: ['./wxScanQRCodePage.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class WxScanQRCodePageComponent extends AppComponentBase implements OnInit {
    scanQRCodeUrl: {};

    constructor(
        private injector: Injector,
        private _localStorageService: LocalStorageService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getWxScanQRCodeUrl();
    }

    getWxScanQRCodeUrl(): void {
        this._localStorageService
        .getItem('wxScanQRCodeUrl')
        .then(result => {
            alert(result);
            this.scanQRCodeUrl = result;
        })
    }
}
