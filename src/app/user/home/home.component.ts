import { ColourCode, DefaultProfilePath } from 'shared/AppConsts';
import { Component, OnInit } from '@angular/core';
import { CurrentUserProfileEditDto, ProfileServiceProxy } from 'shared/service-proxies/service-proxies';

import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class UserHomeComponent implements OnInit {
    shownLoginName: string;
    colorArrs: string[];
    userAvatarUrl: string;
    constructor(
        private _profileServiceProxy: ProfileServiceProxy,
    ) { }

    ngOnInit() {
        this.getCurrentLoginInformations();
    }

    getCurrentLoginInformations(): void {
        this._profileServiceProxy
            .getCurrentUserProfileForEdit()
            .subscribe((result: CurrentUserProfileEditDto) => {
                console.log(result);
                this.userAvatarUrl = result.profilePictureUrl ? result.profilePictureUrl : DefaultProfilePath.defaultProfilePictureUrl;
                this.shownLoginName = result.nickName;
            })
    }
}