import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { WechatScanQRCodeService } from 'shared/services/wechat-scanQRCode.service';
import { DomSanitizer } from '@angular/platform-browser';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-wxScanQRCodePage',
    templateUrl: './wxScanQRCodePage.component.html',
    styleUrls: ['./wxScanQRCodePage.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class WxScanQRCodePageComponent extends AppComponentBase implements OnInit {
    trustScanQRCodeUrl: any;
    scanQRCodeUrl: any;

    constructor(
        private injector: Injector,
        private sanitizer: DomSanitizer,
        private _wechatScanQRCodeService: WechatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.scanQRCodeServiceInit();
    }

    scanQRCodeServiceInit(): void {
        if (this.isWeiXin()) {
            this._wechatScanQRCodeService.init();
            this._wechatScanQRCodeService
            .scanQRCodeSuccess
            .subscribe(result => {
                this.scanQRCodeUrl = result;
                this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.scanQRCodeUrl);
            })
        } else {
            this.message.warn("请在微信内打开!");
        }
    }

}
