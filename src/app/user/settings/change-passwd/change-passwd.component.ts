import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { AppComponentBase } from 'shared/common/app-component-base';
import { CodeSendInput, ChangePasswordByPhoneInput, ChangePasswordInput, SMSServiceProxy, ProfileServiceProxy } from 'shared/service-proxies/service-proxies';
import { VerificationCodeType } from 'shared/AppEnums';
import { AppSessionService } from 'shared/common/session/app-session.service';
import { Location } from '@angular/common';

export class RepeatPasswdDto extends ChangePasswordInput {
    repeatPasswd: string;
}

@Component({
    selector: 'yaojiangjie-change-passwd',
    templateUrl: './change-passwd.component.html',
    styleUrls: ['./change-passwd.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ChangePasswdComponent extends AppComponentBase implements OnInit {

    phoneNumText: string;
    isSendSMS = false;
    input: RepeatPasswdDto = new RepeatPasswdDto();
    byPhoneInput: ChangePasswordByPhoneInput = new ChangePasswordByPhoneInput();
    phoneChangePasswd = false;
    oldPasswdChangePasswd = false;
    showCommandWrap = true;

    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
        private _location: Location,
        private _SMSServiceProxy: SMSServiceProxy,
        private _profileServiceProxy: ProfileServiceProxy,
        private _appSessionService: AppSessionService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.encrypt();
    }
    // 使用旧密码更改密码
    oldPasswdChangeHandler(): void {
        this._profileServiceProxy
            .changePassword(this.input)
            .subscribe(result => {
                this.notify.success('密码修改成功');
                this.showCommandWrap = true;
            });
        this.input = new RepeatPasswdDto();
    }

    // 使用手机验证更改密码
    phoneChangeHandler(): void {
        this._profileServiceProxy
            .changePasswordByPhone(this.byPhoneInput)
            .subscribe(result => {
                this.notify.success('密码修改成功');
                this.showCommandWrap = true;
                this.phoneChangePasswd = false;
                this.oldPasswdChangePasswd = false;

            });
        this.byPhoneInput = new ChangePasswordByPhoneInput();
    }

    showUseOldPasswdEle(): void {
        this.showCommandWrap = false;
        this.oldPasswdChangePasswd = true;
        this.phoneChangePasswd = false;
    }
    usePhoneChangeEle(): void {
        this.showCommandWrap = false;
        this.oldPasswdChangePasswd = false;
        this.phoneChangePasswd = true;
    }

    // 发送验证码
    send() {
        let model = new CodeSendInput();
        model.targetNumber = this._appSessionService.user.phoneNumber;
        model.codeType = VerificationCodeType.ChangePassword;
        // this.captchaResolved();

        this._SMSServiceProxy
            .sendCodeAsync(model)
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
        }, 1000);

        setTimeout(() => {
            clearInterval(set);
            self.isSendSMS = false;
            self._smsBtn.nativeElement.innerHTML = this.l('AgainSendValidateCode');
        }, 60000);
    }
    private encrypt(): void {
        if (!this._appSessionService.user.phoneNumber) {
            return;
        }
        this.phoneNumText = '•••••••' + this._appSessionService.user.phoneNumber.substr(this._appSessionService.user.phoneNumber.length - 4);
    }

}
