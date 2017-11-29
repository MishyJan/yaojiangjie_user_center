import * as ApiServiceProxies from './service-proxies';

import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.TenantRegistrationServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,

        ApiServiceProxies.PictureServiceProxy,
        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.SMSServiceProxy,
        ApiServiceProxies.AccessRecordServiceProxy,
        ApiServiceProxies.ScanServiceProxy,
        ApiServiceProxies.WeChatJSServiceProxy
    ]
})
export class ServiceProxyModule { }
