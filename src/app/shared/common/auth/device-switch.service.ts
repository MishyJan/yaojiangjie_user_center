import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable, state } from '@angular/core';

import { AdminPermissions } from '@shared/AdminPermissions';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { device } from 'device.js';

@Injectable()
export class DeviceSwtichGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        private _appAuthService: AppAuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        device.addClasses(document.documentElement);

        if (device.mobile && (state.url.indexOf('/mobile') >= 0 || state.url.indexOf('mobile#') >= 0)) {
            return true;
        } else if ((device.tablet || device.desktop) && (state.url === '/' || state.url.indexOf('/#') >= 0)) {
            return true;
        }
        this._router.navigate([this.selectBestRoute()]);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        if (device.mobile) {
            return '/mobile';
        } else {
            return '/';
        }
    }
}