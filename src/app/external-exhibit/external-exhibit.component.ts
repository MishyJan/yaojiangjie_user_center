import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
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

    constructor(
        private injector: Injector,
        private el: ElementRef,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
        private _localStorageService: LocalStorageService,
        public weChatScanQRCodeService: WeChatScanQRCodeService,
        public sanitizer: DomSanitizer
    ) {
        super(injector);
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                // 如果路由带有可选参数exhibitUrl，即从已有的目录跳转过来
                // 如果路由带有可选参数wxScanUrl，即从扫码入口进入
                if (params['exhibitUrl']) {
                    this.weChatScanQRCodeService.scanQRCodeResultUrl = params['exhibitUrl'];
                }

                if (params['wxScanUrl']) {
                    this.weChatScanQRCodeService.scanQRCodeResultUrl = params['wxScanUrl'];
                }
            });
    }
}
