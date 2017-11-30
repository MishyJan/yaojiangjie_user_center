import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { WeChatScanQRCodeService } from 'shared/services/wechat-scan-qrcode.service';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

export class TemporaryData {
    title: string;
    imgUrlList: string[];
}

@Component({
    selector: 'yaojiangjie-externalExhibit',
    templateUrl: './external-exhibit.component.html',
    styleUrls: ['./external-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ExternalExhibitComponent extends AppComponentBase implements OnInit, AfterViewInit {
    temporaryList: TemporaryData[] = [];
    trustScanQRCodeUrl: SafeResourceUrl;

    constructor(
        private injector: Injector,
        private el: ElementRef,
        private sanitizer: DomSanitizer,

        private _router: Router,
        private _location: Location,
        private _localStorageService: LocalStorageService,
        private _weChatScanQRCodeService: WeChatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        // 临时测试
        this.temporaryMockData();
        this.getWxScanQRCodeUrl();
    }

    ngAfterViewInit() {
        this.getWxScanQRCodeUrl();
    }

    getWxScanQRCodeUrl(): void {
        if (this._weChatScanQRCodeService.scanResult) {
            this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._weChatScanQRCodeService.scanResult);

        } else {
            this._router.navigate(['/index']);
        }
    }

    /* 模拟扫码后将数据写入localstorage中，key为："wxScanQRCodeInfoList" */
    temporaryMockData(): void {
        let temporary1 = new TemporaryData();
        temporary1.title = '何绍基书法与湖湘传脉';
        temporary1.imgUrlList = ['http://www.vdaolan.com/hy/2017/hsj/img/img_nw/33-10.jpg', 'http://www.vdaolan.com/hy/2017/hsj/img/img_nw/33-01.jpg', 'http://www.vdaolan.com/hy/2017/hsj/img/img_nw/33-03.jpg'];

        let temporary2 = new TemporaryData();
        temporary2.title = '笔砚写成七尺躯';
        temporary2.imgUrlList = ['http://www.vdaolan.com/hy/2017/mqrwh/img/img_nw/60-1.jpg', 'http://www.vdaolan.com/hy/2017/mqrwh/img/img_nw/60-3.jpg'];

        this.temporaryList[0] = temporary1;
        this.temporaryList[1] = temporary2;

        localStorage.setItem('wxScanQRCodeInfoList', JSON.stringify(this.temporaryList));
    }
}
