import { AppComponentBase } from "shared/common/app-component-base";
import { Injector, Component, OnInit } from "@angular/core";
import { WechatScanQRCodeService } from "shared/services/wechat-scanQRCode.service";
import { DomSanitizer } from "@angular/platform-browser";
import { LocalStorageService } from "shared/utils/local-storage.service";

@Component({
    selector: 'xiaoyuyue-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent extends AppComponentBase implements OnInit {
    constructor
        (
        injector: Injector,
        private sanitizer: DomSanitizer,
        private _localStorageService: LocalStorageService,
        private _wechatScanQRCodeService: WechatScanQRCodeService
        ) {
        super(injector);
    }

    ngOnInit() {
        this._wechatScanQRCodeService.init();
    }

    scanQRCode(): void {
        this._wechatScanQRCodeService.scanQRCodeHandler();
    }
}
