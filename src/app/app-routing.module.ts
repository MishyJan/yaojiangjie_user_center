import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { ExternalExhibitComponent } from 'app/external-exhibit/external-exhibit.component';
import { IndexComponent } from 'app/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LookedExhibitComponent } from 'app/looked-exhibit/looked-exhibit.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/index',
                        pathMatch: 'full'
                    },
                    {
                        path: 'index',
                        canActivate: [AppRouteGuard],
                        canActivateChild: [AppRouteGuard],
                        component: IndexComponent
                    },
                    {
                        path: 'external-exhibit',
                        canActivate: [AppRouteGuard],
                        canActivateChild: [AppRouteGuard],
                        component: ExternalExhibitComponent
                    },
                    {
                        path: 'looked-exhibit',
                        canActivate: [AppRouteGuard],
                        canActivateChild: [AppRouteGuard],
                        component: LookedExhibitComponent
                    },
                    {
                        path: 'auth',
                        loadChildren: 'app/auth/auth.module#AuthModule', // Lazy load auth module
                        data: { preload: true }
                    },
                    {
                        path: 'user',
                        loadChildren: 'app/user/user.module#UserModule', // Lazy load user module
                        data: { preload: true }
                    },
                    {
                        path: 'detail',
                        loadChildren: 'app/detail/detail.module#DetailModule', // Lazy load user module
                        data: { preload: true }
                    },
                    {
                        path: 'dir-manage',
                        loadChildren: 'app/dir-manage/dir-manage.module#DirManageModule', // Lazy load user module
                        data: { preload: true }
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
