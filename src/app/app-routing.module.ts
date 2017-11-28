import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexComponent } from 'app/index/index.component';
import { WxScanQRCodePageComponent } from 'app/wxScanQRCodePage/wxScanQRCodePage.component';

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
                        // canActivate: [AppRouteGuard],
                        // canActivateChild: [AppRouteGuard],
                        component: IndexComponent
                    },
                    {
                        path: 'scan-qrcode',
                        component: WxScanQRCodePageComponent
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
                        path: '',
                        loadChildren: 'app/detail/detail.module#DetailModule', // Lazy load user module
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
