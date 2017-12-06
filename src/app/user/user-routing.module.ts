import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { AboutComponent } from 'app/user/about/about.component';
import { AdminPermissions } from '@shared/AdminPermissions';
import { AppRouteGuard } from 'app/shared/common/auth/auth-route-guard';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { FeedbackComponent } from 'app/user/feedback/feedback.component';
import { NgModule } from '@angular/core';
import { SettingsComponent } from 'app/user/settings/settings.component';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './home/home.component';
import { ChangePasswdComponent } from 'app/user/settings/change-passwd/change-passwd.component';
import { ChangePhoneComponent } from 'app/user/settings/change-phone/change-phone.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                component: UserComponent,
                children: [
                    {
                        path: '',
                        component: UserHomeComponent
                    },
                    {
                        path: 'about',
                        component: AboutComponent
                    },
                    {
                        path: 'feedback',
                        component: FeedbackComponent
                    },
                    {
                        path: 'settings',
                        component: SettingsComponent
                    },
                    {
                        path: 'settings/phone',
                        component: ChangePhoneComponent
                    },
                    {
                        path: 'settings/passwd',
                        component: ChangePasswdComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {}
