import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { CreateOrUpdateRecordInput, ScanServiceProxy } from 'shared/service-proxies/service-proxies';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { Location } from '@angular/common';
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
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
        private _localStorageService: LocalStorageService,
        private _scanServiceProxy: ScanServiceProxy,
        private _weChatScanQRCodeService: WeChatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                // 如果路由带有可选参数，即从已有的目录跳转过来，则不创建扫码记录；反之则是扫码进入
                if (params['exhibitUrl']) {
                    this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(params['exhibitUrl']);
                }

                if (params['wxScanUrl']) {
                    this.getWxScanQRCodeUrl(params['wxScanUrl']);
                }
            });
    }

    getWxScanQRCodeUrl(url: string): void {
        if (url) {
            // this.createRecord("http://www.vdaolan.com/hy/exhibit_list.php");
            this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            alert(url);
            this.createRecord(url);
        } else {
            this.message.warn('未能检测到有效的URL');
            this._router.navigate(['/index']);
        }
    }

    // 获取URL让服务器分析页面，创建分析记录
    private createRecord(url: string): void {
        this.scanRecordInput.url = url;
        this.scanRecordInput.catalogId = null;
        this._scanServiceProxy.createOrUpdateRecord(this.scanRecordInput).subscribe();
    }
}
