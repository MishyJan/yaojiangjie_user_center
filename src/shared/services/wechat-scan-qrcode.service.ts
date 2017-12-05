import { EventEmitter, Injectable, Injector } from '@angular/core';
import { GetJsApiSignatureOutput, WeChatJSServiceProxy } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from 'shared/common/app-component-base';
import { AppConsts } from 'shared/AppConsts';
import { JsApiSignatureInput } from 'app/shared/utils/wechat.dto';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { RandomHelper } from 'shared/helpers/RandomHelper';
import { Router } from '@angular/router';
import { device } from 'device.js';

export class jsApiInput {

}
@Injectable()
export class WeChatScanQRCodeService extends AppComponentBase {
    scanResult: string = "http://www.vdaolan.com/hy/exhibit_list.php";
    jsApiSignatureInput: JsApiSignatureInput = new JsApiSignatureInput();
    constructor(
        private injector: Injector,
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _wechatJSService: WeChatJSServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {

    }

    init(): void {
        console.log(device);

        if (device.ios) {
            this.jsApiSignatureInput.sourceUrl = AppConsts.WxJssdkUrl;
        } else {
            this.jsApiSignatureInput.sourceUrl = location.href;
        }
        this.jsApiSignatureInput.nonceStr = RandomHelper.randomString(10);
        this.jsApiSignatureInput.timestamp = moment().unix();
        this._wechatJSService
            .getJsApiSignature(
            this.jsApiSignatureInput.sourceUrl,
            this.jsApiSignatureInput.nonceStr,
            this.jsApiSignatureInput.timestamp
            )
            .subscribe((result: GetJsApiSignatureOutput) => {
                wx.config({
                    debug: true,
                    appId: result.appId,
                    nonceStr: this.jsApiSignatureInput.nonceStr,
                    timestamp: this.jsApiSignatureInput.timestamp,
                    signature: result.signature,
                    jsApiList: ['scanQRCode']
                });
            })
    }

    scanQRCodeHandler(): void {
        if (this.isWeiXin()) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: res => {
                    // 当needResult 为 1 时，扫码返回的结果
                    this.scanResult = res.resultStr;
                    this._router.navigate(['/external-exhibit']);
                }
            });
        } else {
            this.message.warn("请在微信内打开!");
        }
    }
}