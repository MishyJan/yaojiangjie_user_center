import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { LocalStorageService } from 'shared/utils/local-storage.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'yaojiangjie-wxScanQRCodePage',
    templateUrl: './wxScanQRCodePage.component.html',
    styleUrls: ['./wxScanQRCodePage.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class WxScanQRCodePageComponent extends AppComponentBase implements OnInit, AfterViewInit {
    trustScanQRCodeUrl: SafeResourceUrl = null;

    constructor(
        private injector: Injector,
        private _location: Location,
        private sanitizer: DomSanitizer,
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
        this._localStorageService.getItem('wxScanQRCodeUrl', (err, result) => {
            alert("URLLLL"+result);
            if (err) {
                this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result);
            }
        });
    }
}
