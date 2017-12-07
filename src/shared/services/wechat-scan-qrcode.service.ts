import { EventEmitter, Injectable, Injector } from '@angular/core';
import { GetJsApiSignatureOutput, WeChatJSServiceProxy, CreateOrUpdateRecordInput, ScanServiceProxy } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from 'shared/common/app-component-base';
import { AppConsts } from 'shared/AppConsts';
import { JsApiSignatureInput } from 'app/shared/utils/wechat.dto';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { RandomHelper } from 'shared/helpers/RandomHelper';
import { Router } from '@angular/router';
import { device } from 'device.js';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class WeChatScanQRCodeService extends AppComponentBase {
    scanQRCodeResultUrl: SafeResourceUrl;
    jsApiSignatureInput: JsApiSignatureInput = new JsApiSignatureInput();
    scanRecordInput: CreateOrUpdateRecordInput = new CreateOrUpdateRecordInput();
    successScanHandle = new EventEmitter<string>();
    constructor(
        private injector: Injector,
        private _router: Router,
        private sanitizer: DomSanitizer,
        private _localStorageService: LocalStorageService,
        private _wechatJSService: WeChatJSServiceProxy,
        private _scanServiceProxy: ScanServiceProxy,
    ) {
        super(injector);
    }

    init(): void {
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
                    // debug: true,
                    appId: result.appId,
                    nonceStr: this.jsApiSignatureInput.nonceStr,
                    timestamp: this.jsApiSignatureInput.timestamp,
                    signature: result.signature,
                    jsApiList: ['scanQRCode']
                });
            });
    }

    scanQRCodeHandler(): void {
        // let url = 'http://www.vdaolan.com/hy/2017/hsj/hsj_01.php';
        // debugger
        // if (!this.isValidURL(url)) {
        //     this.message.warn('未能检测到有效的URL,请重新扫码!');
        //     this._router.navigate(['/index']);
        //     return;
        // }
        // this.createRecord(url);
        // if (location.href.indexOf('/external-exhibit') > 0) {
        //     this.scanQRCodeResultUrl = url;
        // } else {
        //     this._router.navigate(['/external-exhibit'], { queryParams: { exhibitUrl: url }});
        // }

        if (this.isWeiXin()) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: res => {
                    if (!this.isValidURL(res.resultStr)) {
                        this.message.warn('未能检测到有效的URL,请重新扫码!');
                        this._router.navigate(['/index']);
                        return;
                    }
                    if (location.href.indexOf('/external-exhibit') > 0) {
                        this.scanQRCodeResultUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.resultStr);
                        this.createRecord(res.resultStr);
                    } else {
                        this.createRecord(res.resultStr);
                        this._router.navigate(['/external-exhibit'], { queryParams: { exhibitUrl: res.resultStr }});
                    }
                }
            });
        } else {
            this.message.warn('请在微信内打开!');
        }
    }

    // 获取URL让服务器分析页面，创建分析记录
    private createRecord(url: string): void {
        this.scanRecordInput.url = url;
        this.scanRecordInput.catalogId = null;
        this._scanServiceProxy
            .createOrUpdateRecord(this.scanRecordInput)
            .subscribe(result => {
                console.log(result);
            });
    }
}
