import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { CreateOrUpdateRecordInput, ScanServiceProxy } from 'shared/service-proxies/service-proxies';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { WeChatScanQRCodeService } from 'shared/services/wechat-scan-qrcode.service';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-externalExhibit',
    templateUrl: './external-exhibit.component.html',
    styleUrls: ['./external-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ExternalExhibitComponent extends AppComponentBase implements OnInit {
    trustScanQRCodeUrl: SafeResourceUrl;
    scanRecordInput: CreateOrUpdateRecordInput = new CreateOrUpdateRecordInput();

    constructor(
        private injector: Injector,
        private el: ElementRef,
        private sanitizer: DomSanitizer,
        private _router: Router,
        private _location: Location,
        private _localStorageService: LocalStorageService,
        private _scanServiceProxy: ScanServiceProxy,
        private _weChatScanQRCodeService: WeChatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getWxScanQRCodeUrl();
    }

    getWxScanQRCodeUrl(): void {
        if (this._weChatScanQRCodeService.scanResult) {
            // this.createRecord(this._weChatScanQRCodeService.scanResult);
            this.createRecord("http://www.vdaolan.com/hy/exhibit_list.php");

            this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._weChatScanQRCodeService.scanResult);
        } else {
            this.message.warn("未能检测到有效的URL");
            this._router.navigate(['/index']);
        }
    }

    // 获取URL让服务器分析页面，创建分析记录
    createRecord(url: string): void {
        this.scanRecordInput.url = url;
        this.scanRecordInput.catalogId = null;
        this._scanServiceProxy.createOrUpdateRecord(this.scanRecordInput).subscribe();
        this._localStorageService.removeItem("wxScaenQRCodeInfoList");
    }
}
