import * as ngCommon from '@angular/common';

import { HttpModule, JsonpModule } from '@angular/http';

import { AppConsts } from '@shared/AppConsts';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@shared/common/common.module';
import { ConfirmEmailComponent } from './shared/email-activation/confirm-email.component';
import { EmailActivationComponent } from './shared/email-activation/email-activation.component';
import { ExternalAuthComponent } from './external-auth/external-auth.component';
import { ForgotPasswordComponent } from './password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { LanguageSwitchComponent } from './language-switch.component';
import { LocalizationService } from 'abp-ng2-module/src/localization/localization.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './../../shared/services/login.service';
import { LuosimaoCaptcha } from './shared/luosimao-captcha/luosimao-captcha.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { PhoneValidateComponent } from './shared/phone-validate/phone-validate.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './password/reset-password.component';
import { SendTwoFactorCodeComponent } from './login/send-two-factor-code.component';
import { TenantChangeComponent } from './shared/tenant-change.component';
import { TenantChangeModalComponent } from './shared/tenant-change-modal.component';
import { TenantRegistrationHelperService } from './register/tenant-registration-helper.service';
import { TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '@shared/utils/utils.module';
import { ValidateTwoFactorCodeComponent } from './login/validate-two-factor-code.component';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,

        ModalModule.forRoot(),
        TooltipModule.forRoot(),

        CommonModule,

        UtilsModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent,
        TenantChangeComponent,
        TenantChangeModalComponent,
        LoginComponent,
        ExternalAuthComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        EmailActivationComponent,
        ConfirmEmailComponent,
        SendTwoFactorCodeComponent,
        ValidateTwoFactorCodeComponent,
        LanguageSwitchComponent,
        PhoneValidateComponent,
        LuosimaoCaptcha
    ],
    providers: [
        TenantRegistrationHelperService,
        TooltipModule
    ]
})
export class AuthModule {
    constructor(private localization: LocalizationService) {

    }

    public l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, AppConsts.localization.defaultLocalizationSourceName);

        if (localizedText === key) {
            localizedText = this.localization.localize(key, AppConsts.localization.commonLocalizationSourceName);
        }

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }
}
