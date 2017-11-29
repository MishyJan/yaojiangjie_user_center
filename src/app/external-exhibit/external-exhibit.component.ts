import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/utils/local-storage.service';
import { Location } from '@angular/common';
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
        private sanitizer: DomSanitizer,
        private _location: Location,
        private _localStorageService: LocalStorageService,
    ) {
        super(injector);
    }

    ngOnInit() {
        // 临时测试
        this.temporaryMockData();
        this.getWxScanQRCodeUrl();
    }

    ngAfterViewInit() {
    }

    getWxScanQRCodeUrl(): void {
        let tempUrl = localStorage.getItem('wxScanQRCodeUrl');
        if (!tempUrl) {
            this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
            this.message.confirm('未检测到二维码,请重新扫码!', () => {
                this._location.back();
            });
            return;
        }
        this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempUrl);
    }

    /* 模拟扫码后将数据写入localstorage中，key为："wxScanQRCodeInfoList" */
    temporaryMockData(): void {
        let temporary1 = new TemporaryData();
        temporary1.title = "何绍基书法与湖湘传脉";
        temporary1.imgUrlList = ["http://www.vdaolan.com/hy/2017/hsj/img/img_nw/33-10.jpg", "http://www.vdaolan.com/hy/2017/hsj/img/img_nw/33-01.jpg", "http://www.vdaolan.com/hy/2017/hsj/img/img_nw/33-03.jpg"];

        let temporary2 = new TemporaryData();
        temporary2.title = "笔砚写成七尺躯";
        temporary2.imgUrlList = ["http://www.vdaolan.com/hy/2017/mqrwh/img/img_nw/60-1.jpg", "http://www.vdaolan.com/hy/2017/mqrwh/img/img_nw/60-3.jpg"];

        this.temporaryList[0] = temporary1;
        this.temporaryList[1] = temporary2;

        localStorage.setItem("wxScanQRCodeInfoList", JSON.stringify(this.temporaryList));
    }
}
