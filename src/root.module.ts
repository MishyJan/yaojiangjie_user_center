import { ABP_HTTP_PROVIDER, AbpModule } from '@abp/abp.module';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { AbpHttpConfiguration, IErrorInfo } from 'abp-ng2-module/src/abpHttp';
import { getTestBed, inject } from '@angular/core/testing';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppConsts } from '@shared/AppConsts';
import { AppModule } from './app/app.module';
import { AppPreBootstrap } from './AppPreBootstrap';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@shared/common/common.module';
import { RootComponent } from './root.component';
import { RootRoutingModule } from './root-routing.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ServicesModule } from 'shared/services/services.module';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { appLoadingBusy } from './shared/animations/loadingTransition';

export function appInitializerFactory(injector: Injector) {
    return () => {
        // abp.ui.setBusy();
        appLoadingBusy.setBusy();
        handleLogoutRequest(injector.get(AppAuthService));
        InitErrorMessage(injector);
        return new Promise<boolean>((resolve, reject) => {
            AppPreBootstrap.run(() => {
                const appSessionService: AppSessionService = injector.get(AppSessionService);
                appSessionService.init().then(
                    (result) => {
                        // abp.ui.clearBusy();
                        appLoadingBusy.clearBusy();
                        resolve(result);
                    },
                    (err) => {
                        // abp.ui.clearBusy();
                        appLoadingBusy.clearBusy();
                        reject(err);
                    }
                );
            });
        });
    }
}

export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
}


function InitErrorMessage(injector: Injector) {
    const abpHttpConfiguration: AbpHttpConfiguration = injector.get(AbpHttpConfiguration);
    abpHttpConfiguration.defaultError = <IErrorInfo>{
        message: '发生了一个错误!',
        details: '无法连接服务器.'
    };

    abpHttpConfiguration.defaultError401 = <IErrorInfo>{
        message: '您没有登录!',
        details: '您应该通过身份验证(登录)以执行此操作.'
    };

    abpHttpConfiguration.defaultError403 = <IErrorInfo>{
        message: '您未被授权!',
        details: '您没有权限执行此操作.'
    };

    abpHttpConfiguration.defaultError404 = <IErrorInfo>{
        message: '资源文件没找到!',
        details: '请求的资源无法在服务器上找到.'
    };
}

function handleLogoutRequest(authService: AppAuthService) {
    const currentUrl = UrlHelper.initialUrl;
    const returnUrl = UrlHelper.getReturnUrl();
    if (currentUrl.indexOf(('account/logout')) >= 0 && returnUrl) {
        authService.logout(true, returnUrl);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModule,
        CommonModule.forRoot(),
        AbpModule,
        ServiceProxyModule,
        ServicesModule,
        RootRoutingModule
    ],
    declarations: [
        RootComponent
    ],
    providers: [
        ABP_HTTP_PROVIDER,
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [Injector],
            multi: true
        }
    ],
    bootstrap: [RootComponent]
})
export class RootModule {

}