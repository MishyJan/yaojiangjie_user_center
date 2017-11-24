import { Router, RouterModule } from '@angular/router';

import { AdminPermissions } from '@shared/AdminPermissions';
import { AppRouteGuard } from 'app/shared/common/auth/auth-route-guard';
import { HomeComponent } from 'app/home/home.component';
import { NgModule } from '@angular/core';
import { TimeLineComponent } from './time-line/time-line.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                component: HomeComponent,
                children: [
                    {
                        path: '',
                        data: { breadcrumb: 'Menu.UserCenter' },
                        component: TimeLineComponent
                    },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {

}
