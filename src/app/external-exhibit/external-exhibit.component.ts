import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/utils/local-storage.service';
import { Location } from '@angular/common';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-externalExhibit',
    templateUrl: './external-exhibit.component.html',
    styleUrls: ['./external-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ExternalExhibitComponent extends AppComponentBase implements OnInit, AfterViewInit {
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
}
