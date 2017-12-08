import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { WeChatScanQRCodeService } from 'shared/services/wechat-scan-qrcode.service';

@Component({
    selector: 'yaojiangjie-externalExhibit',
    templateUrl: './external-exhibit.component.html',
    styleUrls: ['./external-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ExternalExhibitComponent extends AppComponentBase implements OnInit {
    @ViewChild('exhibitIframe') exhibitIframe: ElementRef;
    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
        public _weChatScanQRCodeService: WeChatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                if (params['exhibitUrl']) {
                    this.exhibitIframe.nativeElement.src = params['exhibitUrl'];
                }
            });
    }

    getExhibitUrlHandle(url: string): void {
        this._weChatScanQRCodeService.scanQRCodeHandler(url);
    }
}
