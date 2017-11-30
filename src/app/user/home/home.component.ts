import { Component, OnInit } from '@angular/core';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { DefaultProfilePath, ColourCode } from 'shared/AppConsts';

@Component({
    selector: 'yaojiangjie-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class UserHomeComponent implements OnInit {
    colorArrs: string[];
    userAvatarUrl: string;
    constructor() { }

    ngOnInit() {
    }

    getUserAvatar(): string {
        return this.userAvatarUrl ? this.userAvatarUrl : DefaultProfilePath.defaultProfilePictureUrl;
    }
}
