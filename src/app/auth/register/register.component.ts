import { AccountServiceProxy, CodeSendInput, PasswordComplexitySetting, ProfileServiceProxy, SMSServiceProxy, RegisterInput, PhoneAuthenticateModel } from '@shared/service-proxies/service-proxies'
import { Component, ElementRef, Injector, NgModule, OnInit, ViewChild } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { LoginService } from "shared/services/login.service";
import { Router } from '@angular/router';
import { VerificationCodeType } from "shared/AppEnums";
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./resister.components.scss'],
    animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase implements OnInit {
    phoneInput: PhoneAuthenticateModel = new PhoneAuthenticateModel();;
    phoneNumber: string;
    isSendSMS: boolean = false;
    confirmPasswd: string;

    registerInput: RegisterInput = new RegisterInput();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

    saving: boolean = false;

    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _accountServiceProxy: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService,
        private _profileService: ProfileServiceProxy,
        private _SMSServiceProxy: SMSServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        if (this.isWeiXin()) {
            this._router.navigate(['auth/login']);
            return;
        }

        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });

        // 注释螺丝帽
        /*jQuery.getScript('//captcha.luosimao.com/static/js/api.js', () => {
        });*/
    }

    // get useCaptcha(): boolean {
    //     return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
    // }

    register(): void {

        this.saving = true;
        this._accountServiceProxy.register(this.registerInput)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {
                if (!result.canLogin) {
                    this.notify.success(this.l('SuccessfullyRegistered'));
                    this._router.navigate(['auth/login']);
                    return;
                }

                //Autheticate
                this.saving = true;
                this.phoneInput.phoneNum = this.registerInput.phoneNumber;
                this.phoneInput.loginCode = this.registerInput.registerCode;
                this.phoneInput.rememberClient = true;
                this._loginService.phoneNumAuth(this.phoneInput, () => this.saving = false);

                // this._loginService.authenticateModel.loginCertificate = this.registerInput.name;
                // this._loginService.authenticateModel.password = this.registerInput.password;
                // this._loginService.authenticate(() => { this.saving = false; });
            });
    }

    // 注释掉螺丝帽验证码
    // captchaResolved(): void {
    //     let captchaResponse = $('#lc-captcha-response').val();
    //     this.model.captchaResponse = captchaResponse;
    // }

    // 发送验证码
    send() {
        let input: CodeSendInput = new CodeSendInput();
        input.targetNumber = this.registerInput.phoneNumber;
        input.codeType = VerificationCodeType.Register;
        input.captchaResponse = "";
        // input.captchaResponse = this.captchaResolved();

        this._SMSServiceProxy
            .sendCodeAsync(input)
            .subscribe(result => {
                this.anginSend();
            });
    }

    anginSend() {
        let self = this;
        let time = 60;
        this.isSendSMS = true;
        let set = setInterval(() => {
            time--;
            self._smsBtn.nativeElement.innerHTML = `${time} 秒`;
        }, 1000)

        setTimeout(() => {
            clearInterval(set);
            self.isSendSMS = false;
            self._smsBtn.nativeElement.innerHTML = this.l("AgainSendValidateCode");
        }, 60000);
    }

    isWeiXin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) + "" == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
}