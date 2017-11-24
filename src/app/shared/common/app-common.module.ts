import * as ngCommon from '@angular/common';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { AppAuthService } from './auth/app-auth.service';
import { AppLocalizationService } from 'app/shared/common/localization/app-localization.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { CommonModule } from '@shared/common/common.module';
import { DeviceSwtichGuard } from './auth/device-switch.service';
import { EmptyPageComponent } from 'app/shared/common/empty-page/empty-page.component';
import { FormsModule } from '@angular/forms';
import { JqPluginDirective } from './libs/jq-plugin.directive';
import { ModalModule } from 'ngx-bootstrap';
import { TimeZoneComboComponent } from './timing/timezone-combo.component';
import { UtilsModule } from '@shared/utils/utils.module';
import { PagingComponent } from './paging/paging.component';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        UtilsModule,
        AbpModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        TimeZoneComboComponent,
        JqPluginDirective,
        EmptyPageComponent,
        PagingComponent
    ],
    exports: [
        TimeZoneComboComponent,
        EmptyPageComponent,
        JqPluginDirective,
        PagingComponent
    ],
    providers: [
        AppLocalizationService
    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule,
            providers: [
                AppAuthService,
                AppRouteGuard,
            ]
        }
    }
}