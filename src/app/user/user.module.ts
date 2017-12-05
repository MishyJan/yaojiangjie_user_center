import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';

import { AppCommonModule } from 'app/shared/common/app-common.module';
import { AppModule } from 'app';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { UserHomeComponent } from 'app/user/home/home.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        InfiniteScrollModule,

        UserRoutingModule,
        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        UserComponent,
        UserHomeComponent,
    AboutComponent,
    SettingsComponent,
    FeedbackComponent
],
    providers: [
    ],
    bootstrap: [UserComponent]
})
export class UserModule {

}
