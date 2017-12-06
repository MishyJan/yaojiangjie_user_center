import { Component, OnInit, Injector } from '@angular/core';

import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ProfileServiceProxy, UserSecurityInfoDto, ExternalUnBindingModel, TokenAuthServiceProxy } from 'shared/service-proxies/service-proxies';
import { CookiesService } from 'shared/services/cookies.service';
import { AppConsts } from 'shared/AppConsts';

@Component({
    selector: 'yaojiangjie-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    animations: [appModuleSlowAnimation()]

})
export class SettingsComponent extends AppComponentBase implements OnInit {
    externalWechatUrl: string;
    linkedWechatText: string;
    userSecurityInfo: UserSecurityInfoDto;

    constructor(
        private injector: Injector,
        private _tokenAuthService: TokenAuthServiceProxy,
        private _cookiesService: CookiesService,
        private _profileServiceProxy: ProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getUserSecurityInfo();
    }

    // 获取当前用户安全信息
    getUserSecurityInfo(): void {
        this._profileServiceProxy
            .getCurrentUserSecurityInfo()
            .subscribe(result => {
                this.userSecurityInfo = result;
                this.linkedWechatText = result.weChat ? result.weChat : '未关联';
            });
    }

    linkWechat(): void {
        if (this.checkIsBindWechat()) {
            this.message.confirm('是否解绑微信', result => {
                if (result) {
                    this.unBindWeChat();
                }
            });
            return;
        }
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + 1);
        this._cookiesService.setCookieValue('UrlHelper.redirectUrl', location.href, exdate, '/');
        this.externalWechatUrl = AppConsts.appBaseUrl + '/auth/external?authToken=' + this._cookiesService.getToken() + '&isAuthBind=true&redirectUrl=' + encodeURIComponent(document.location.href);
        window.location.href = this.externalWechatUrl;
    }

    checkIsBindWechat(): boolean {
        if (this.userSecurityInfo.weChat) {
            this.linkedWechatText = this.userSecurityInfo.weChat;
            return true;
        }
        this.linkedWechatText = '未关联';
        return false;
    }

    // 解绑微信
    unBindWeChat() {
        const data = new ExternalUnBindingModel();
        data.authProvider = 'WeChat';
        this._tokenAuthService.externalUnBinding(data).subscribe(result => {
            this.getUserSecurityInfo();
            this.notify.success('解绑成功');
        });
    }
}
