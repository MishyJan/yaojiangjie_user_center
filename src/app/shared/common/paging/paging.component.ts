import { Component, Injector, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { DomSanitizer } from '@angular/platform-browser';
import { WeChatScanQRCodeService } from 'shared/services/wechat-scan-qrcode.service';
import { Router } from '@angular/router';
import { CreateOrUpdateRecordOutput } from 'shared/service-proxies/service-proxies';

@Component({
    selector: 'yaojiangjie-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent extends AppComponentBase implements OnInit {
    scanQRCodeUrl: any;
    @Input()
    scanRecordOutput: CreateOrUpdateRecordOutput = new CreateOrUpdateRecordOutput();
    @Output()
    sendExhibitUrl: EventEmitter<string> = new EventEmitter();
    constructor(
        private injector: Injector,
        private _router: Router,
        private sanitizer: DomSanitizer,
        private _wechatScanQRCodeService: WeChatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this._wechatScanQRCodeService.init();
    }

    scanQRCode(): void {
        this._wechatScanQRCodeService.scanQRCodeHandler();
    }

    getExhibitUrl(url: string): void {
        this.sendExhibitUrl.emit(url);
    }
}
