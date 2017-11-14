import * as ngCommon from '@angular/common';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { SwitchLangComponent } from '../shared/common/switch-lang/switch-lang.component';
import { PagingComponent } from '../shared/common/paging/paging.component';
import { LightAudioComponent } from '../shared/common/light-audio/light-audio.component';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        SwitchLangComponent,
        PagingComponent,
        LightAudioComponent
    ],
    exports: [
        HeaderComponent,
        SwitchLangComponent,
        PagingComponent,
        LightAudioComponent
    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule,
            providers: [
                // AppAuthService,
                // AppRouteGuard
            ]
        }
    }
}
