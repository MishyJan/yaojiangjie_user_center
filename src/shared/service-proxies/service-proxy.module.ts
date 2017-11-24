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
        ApiServiceProxies.BookingServiceProxy,
        ApiServiceProxies.PerBookingOrderServiceProxy,
        ApiServiceProxies.BookingRecordServiceProxy,
        ApiServiceProxies.WeChatJSServiceProxy
    ]
})
export class ServiceProxyModule { }
