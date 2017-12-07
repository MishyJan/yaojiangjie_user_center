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
    src: string = 'http://www.vdaolan.com/hy/2017/hsj/hsj_01.php';
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
        setTimeout( () => {
            this.src = 'http://www.vdaolan.com/hy/2017/hsj/hsj_02.php';
        }, 3000)
        // this._route
        //     .queryParams
        //     .subscribe(params => {
        //         if (params['exhibitUrl']) {
        //             this.weChatScanQRCodeService.scanQRCodeResultUrl = params['exhibitUrl'];
        //         }
        //     });
    }
}
