import { Component, OnInit } from '@angular/core';
import { AppConsts } from '../../../AppConsts';

@Component({
    selector: 'yaojiangjie-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    updateData(): void {
        document.getElementsByTagName("title")[0].innerHTML = AppConsts.appTitle;
    }

}
