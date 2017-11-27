import { Injectable, EventEmitter } from '@angular/core';
import { WeChatJSServiceProxy, GetJsApiSignatureOutput } from 'shared/service-proxies/service-proxies';
import { JsApiSignatureInput } from 'app/shared/utils/wechat.dto';
import { RandomHelper } from 'shared/helpers/RandomHelper';
import { AppConsts } from 'shared/AppConsts';

@Injectable()
export class WechatScanQRCodeService {
    scanQRCodeSuccess = new EventEmitter<any>();
    jsApiSignatureInput: JsApiSignatureInput = new JsApiSignatureInput();
    constructor(
        private _wechatJSService: WeChatJSServiceProxy
    ) { }

    init(): void {
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

                wx.ready(() => {
                    wx.scanQRCode({
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: res => {
                            this.scanQRCodeSuccess.emit(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
                        }
                    });
                })
            })
    }
}