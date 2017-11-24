import { Injectable } from '@angular/core';
import { WeChatJSServiceProxy, GetJsApiSignatureOutput } from 'shared/service-proxies/service-proxies';
import { JsApiSignatureInput } from 'app/shared/utils/wechat.dto';
import { RandomHelper } from 'shared/helpers/RandomHelper';

@Injectable()
export class WechatScanQRCodeService {
    jsApiSignatureInput: JsApiSignatureInput = new JsApiSignatureInput();
    constructor(
        private _wechatJSService: WeChatJSServiceProxy
    ) { }

    init(): void {
        this.jsApiSignatureInput.sourceUrl = location.href;
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
                    appId: result.appId,
                    nonceStr: this.jsApiSignatureInput.nonceStr,
                    timestamp: this.jsApiSignatureInput.timestamp,
                    signature: result.signature,
                    jsApiList: ['scanQRCode']
                });

                wx.ready(() => {
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: res => {
                            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            alert(result)
                        }
                    });
                })
            })
    }
}