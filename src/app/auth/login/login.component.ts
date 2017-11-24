import * as _ from 'lodash';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticateModel, AuthenticateResultModel, ExternalLoginProviderInfoModel, TokenAuthServiceProxy, PhoneAuthenticateModel, CodeSendInput, SMSServiceProxy } from '@shared/service-proxies/service-proxies';
import { ExternalLoginProvider, LoginService } from 'shared/services/login.service';
import { Headers, Http } from '@angular/http';

import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from 'shared/common/session/app-session.service';
import { Location } from '@angular/common';
import { NgxAni } from 'ngxani';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { VerificationCodeType } from 'shared/AppEnums';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppComponentBase implements OnInit, AfterViewInit {
    phoneModel: PhoneAuthenticateModel = new PhoneAuthenticateModel();
    externalLoginProviders: ExternalLoginProvider[];

    flag = true;
    // 普通登录或者手机验证登录，默认普通登录
    ordinaryLogin = true;
    saving = false;
    isSendSMS = false;
    
    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _location: Location,
        private _activatedRoute: ActivatedRoute,
        private _sessionService: AppSessionService,
        private _tokenAuthService: TokenAuthServiceProxy,
        private _SMSServiceProxy: SMSServiceProxy,
        private _ngxAni: NgxAni
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if (this._sessionService.user) {
            this._router.navigate(['/user/home']);
        }

        if (this.isWeiXin()) {
            this._router.navigate(['/auth/external']);
        }
    }

    ngAfterViewInit(): void {
        const self = this;
        // 解决Chrome浏览器自动填充的BUG
        setTimeout(() => {
            $('input:-webkit-autofill').addClass('edited')
        }, 600);
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }

    login(): void {
        if (!this.loginService.authenticateModel.loginCertificate || !this.loginService.authenticateModel.password) {
            this.message.error(this.l('UserNameOrPasswdCannotForNull'), this.l('CannotLogin'));
            return;
        }

        this.saving = true;
        if (!this.ordinaryLogin) {
            this.loginService.phoneNumAuth(this.phoneModel, () => this.saving = false);
            return;
        }

        this.loginService.authenticate(
            () => this.saving = false
        );
    }

    mobileExternalLogin(provider: ExternalLoginProvider): void {
        this.loginService.externalAuthenticate(provider);
    }

    // 是否账号登录
    isOrdinaryLogin() {
        this.ordinaryLogin = true;
    }
    // 是否手机验证登录
    isPhoneLogin() {
        this.ordinaryLogin = false;
    }

        // 发送验证码
        send() {
            const input: CodeSendInput = new CodeSendInput();
            input.targetNumber = this.phoneModel.phoneNum;
            input.codeType = VerificationCodeType.Login;
            // this.captchaResolved();
    
            this._SMSServiceProxy
                .sendCodeAsync(input)
                .subscribe(result => {
                    this.anginSend();
                });
        }
    
        anginSend() {
            const self = this;
            let time = 60;
            this.isSendSMS = true;
            const set = setInterval(() => {
                time--;
                self._smsBtn.nativeElement.innerHTML = `${time} 秒`;
            }, 1000);
    
            setTimeout(() => {
                clearInterval(set);
                self.isSendSMS = false;
                self._smsBtn.nativeElement.innerHTML = this.l('AgainSendValidateCode');
            }, 60000);
        }
}
