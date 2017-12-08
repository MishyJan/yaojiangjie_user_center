import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { WeChatScanQRCodeService } from 'shared/services/wechat-scan-qrcode.service';
import { ScanServiceProxy, GetRecordForDisplayOutput } from 'shared/service-proxies/service-proxies';

@Component({
    selector: 'yaojiangjie-externalExhibit',
    templateUrl: './external-exhibit.component.html',
    styleUrls: ['./external-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ExternalExhibitComponent extends AppComponentBase implements OnInit {
    @ViewChild('exhibitIframe') exhibitIframe: ElementRef;
    recordForDisplayOutput: GetRecordForDisplayOutput = new GetRecordForDisplayOutput();
    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
        private _scanServiceProxy: ScanServiceProxy,
        public _weChatScanQRCodeService: WeChatScanQRCodeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                if (params['exhibitUrl']) {

                    this._scanServiceProxy
                    .getRecordForDisplay(params['exhibitUrl'])
                    .subscribe( result => {
                        this.recordForDisplayOutput = result;
                    });

                    if (params['exhibitUrl'].indexOf('mp.weixin.qq.com') > 0) {
                        $.ajaxPrefilter((options) => {
                            if (options.crossDomain && jQuery.support.cors) {
                                let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                            }
                        });

                        $.get(params['exhibitUrl'], (response) => {
                            let html = response;
                            html = html.replace(/data-src/g, 'src');
                            let html_src = 'data:text/html;charset=utf-8,' + html;
                            this.exhibitIframe.nativeElement.src =  html_src;
                        });
                        return;
                    }
                    this.exhibitIframe.nativeElement.src = params['exhibitUrl'];
                }
            });
    }

    getExhibitUrlHandle(url: string): void {
        this._weChatScanQRCodeService.scanQRCodeHandler(url);
    }
}
