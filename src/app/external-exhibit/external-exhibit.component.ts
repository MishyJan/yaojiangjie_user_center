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

    getExhibitUrlHandle(url: string): void {
        this._weChatScanQRCodeService.scanQRCodeHandler(url);
    }
}
