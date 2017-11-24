import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { AdminPermissions } from '@shared/AdminPermissions';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { CookiesService } from 'shared/services/cookies.service';
import { Injectable } from '@angular/core';
import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _permissionChecker: PermissionCheckerService,
        private _router: Router,
        private _cookiesService: CookiesService,
        private _appAuthService: AppAuthService,
        private _sessionService: AppSessionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this._sessionService.user) {
            this._appAuthService.recordRedirectUrl();
            this._router.navigate(['/auth/login']);
            return false;
        }

        if (!route.data || !route.data['permission']) {
            return true;
        }

        if (this._permissionChecker.isGranted(route.data['permission'])) {
            return true;
        }

        this._router.navigate([this.selectBestRoute()]);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        if (!this._sessionService.user) {
            return '/auth/login';
        }

        // if (this._permissionChecker.isGranted(AdminPermissions.hostDashboard)) {
        //     return '/app/user/hostDashboard';
        // }

        // if (this._permissionChecker.isGranted(AdminPermissions.tenantDashboard)) {
        //     return '/home';
        // }

        // if (this._permissionChecker.isGranted(AdminPermissions.userManage_Tenants)) {
        //     return '/app/user/tenants';
        // }

        // if (this._permissionChecker.isGranted(AdminPermissions.userManage)) {
        //     return '/user/info';
        // }

        return '/app/notifications';
    }
}
