import { Injectable, EventEmitter, Injector } from '@angular/core';
import { WeChatJSServiceProxy, GetJsApiSignatureOutput } from 'shared/service-proxies/service-proxies';
import { JsApiSignatureInput } from 'app/shared/utils/wechat.dto';
import { RandomHelper } from 'shared/helpers/RandomHelper';
import { AppConsts } from 'shared/AppConsts';
import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/utils/local-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class WechatScanQRCodeService extends AppComponentBase {
    jsApiSignatureInput: JsApiSignatureInput = new JsApiSignatureInput();
    constructor(
        private injector: Injector,
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _wechatJSService: WeChatJSServiceProxy
    ) {
        super(injector);
    }

    init(): void {
        if (this.isWeiXin()) {
            this.jsApiSignatureInput.sourceUrl = AppConsts.WxJssdkUrl;
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
        } else {
            this.message.warn("请在微信内打开!");
        }
    }

    scanQRCodeHandler(): void {
        if (this.isWeiXin()) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: res => {
                    // 当needResult 为 1 时，扫码返回的结果
                    localStorage.setItem('wxScanQRCodeUrl', res.resultStr);
                    this._router.navigate(['/scan-qrcode']);
                }
            });
        } else {
            this.message.warn("请在微信内打开!");
        }
    }
}