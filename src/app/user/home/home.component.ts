import { ColourCode, DefaultProfilePath } from 'shared/AppConsts';
import { Component, OnInit, Injector } from '@angular/core';
import { CurrentUserProfileEditDto, ProfileServiceProxy } from 'shared/service-proxies/service-proxies';

import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'yaojiangjie-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class UserHomeComponent extends AppComponentBase implements OnInit {
    shownLoginName: string;
    colorArrs: string[];
    userAvatarUrl: string;
    constructor(
        private injector: Injector,
        private _authService: AppAuthService,
        private _profileServiceProxy: ProfileServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getCurrentLoginInformations();
    }

    getCurrentLoginInformations(): void {
        this._profileServiceProxy
            .getCurrentUserProfileForEdit()
            .subscribe((result: CurrentUserProfileEditDto) => {
                console.log(result);
                this.userAvatarUrl = result.profilePictureUrl ? result.profilePictureUrl : DefaultProfilePath.defaultProfilePictureUrl;
                this.shownLoginName = result.name;
            });
    }

    logout(): void {
        this._authService.logout(true, '/auth/login');
    }
}
