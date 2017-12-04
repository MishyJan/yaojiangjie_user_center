import { Component, OnInit } from '@angular/core';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { DefaultProfilePath, ColourCode } from 'shared/AppConsts';
import { ProfileServiceProxy, CurrentUserProfileEditDto } from 'shared/service-proxies/service-proxies';

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
        // this.getUserAvatar();
        this.getCurrentLoginInformations();
        this.userAvatarUrl = DefaultProfilePath.defaultProfilePictureUrl;
    }

    getUserAvatar(): void {
            this._profileServiceProxy.getProfilePicture().subscribe(result => {
                if (result && result.profilePicture) {
                    console.log(result);
                    
                    // this.userAvatarUrl = result.profilePicture;
                    this.userAvatarUrl ? this.userAvatarUrl : DefaultProfilePath.defaultProfilePictureUrl;
                }
            });
    }

    getCurrentLoginInformations(): void {
        this._profileServiceProxy
            .getCurrentUserProfileForEdit()
            .subscribe((result: CurrentUserProfileEditDto) => {
                console.log(result);
                
                this.shownLoginName = result.nickName;
            })
    }
}
