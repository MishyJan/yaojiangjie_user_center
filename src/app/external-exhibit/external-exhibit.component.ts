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
                if (params['exhibitUrl']) {
                    this.trustScanQRCodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(params['exhibitUrl']);
                }

                $.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors) {
                        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                    };
                });

                var share_link = "http://mp.weixin.qq.com/s/Fm92Rgqhu8u_MAiIh8XpAQ";
                $.get(share_link, function (response) {
                    var html = response;
                    html = html.replace(/data-src/g, "src");
                    var html_src = 'data:text/html;charset=utf-8,' + html;
                    $("iframeId").attr("src", html_src);
                });

            });
    }
}
