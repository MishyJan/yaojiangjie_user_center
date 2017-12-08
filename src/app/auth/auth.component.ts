import { AfterViewInit, Component, Injector, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { LoginService } from 'shared/services/login.service';
import { WeChatShareTimelineService } from 'shared/services/wechat-share-timeline.service';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: [
        './auth.component.scss',
    ],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent extends AppComponentBase implements OnInit, AfterViewInit {
    private viewContainerRef: ViewContainerRef;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    public constructor(
        injector: Injector,
        private _loginService: LoginService,
        viewContainerRef: ViewContainerRef,
        private _weChatShareTimelineService: WeChatShareTimelineService,
    ) {
        super(injector);

        this.viewContainerRef = viewContainerRef; // We need this small hack in order to catch application root view container ref for modals
    }

    showTenantChange(): boolean {
        return abp.multiTenancy.isEnabled && !this.supportsTenancyNameInUrl();
    }

    ngOnInit(): void {
        this._loginService.init();
        $('body').attr('class', 'page-md login');
    }

    ngAfterViewInit(): void {
    }

    private supportsTenancyNameInUrl() {
        return (AppConsts.appBaseUrlFormat && AppConsts.appBaseUrlFormat.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) >= 0);
    }


}
