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

    randomColorStyle(): any {
        this.colorArrs = ["#338EFF", "#02BF25", "#F79839"];
        let randomNum = parseInt(Math.random() * 3 + "");
        this.colorArrs.sort(function(){ return 0.5 - Math.random() });
        let style = {
            'border-left-color': this.colorArrs[randomNum]
        };
        return style;
    }

}
