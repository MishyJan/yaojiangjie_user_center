import * as ngCommon from '@angular/common';

import { HttpModule, JsonpModule } from '@angular/http';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';

import { AbpModule } from '@abp/abp.module';
import { AppCommonModule } from './shared/common/app-common.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ServicesModule } from 'shared/services/services.module';
import { UploaderComponent } from './shared/uploader/uploader.component';
import { UtilsModule } from '@shared/utils/utils.module';

@NgModule({
    declarations: [
        AppComponent,
        UploaderComponent
    ],
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        UtilsModule,
        AppCommonModule.forRoot(),
        ServiceProxyModule,
        ServicesModule
    ],
    providers: [
    ]
})
export class AppModule {
    // 提前 注册 BreadcrumbService
    constructor(private breadcrumbService: BreadcrumbService) {

    }
}
