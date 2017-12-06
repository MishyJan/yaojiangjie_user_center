import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { WeChatScanQRCodeService } from 'shared/services/wechat-scan-qrcode.service';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class IndexComponent extends AppComponentBase implements OnInit {
    constructor
        (
        injector: Injector,
        private sanitizer: DomSanitizer,
        private _localStorageService: LocalStorageService,
        private _wechatScanQRCodeService: WeChatScanQRCodeService
        ) {
        super(injector);
    }

    ngOnInit() {
    }

    scanQRCode(): void {
        this._wechatScanQRCodeService.scanQRCodeHandler();
    }
}
