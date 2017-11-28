import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'yaojiangjie-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent extends AppComponentBase implements OnInit {

    constructor(
        private injector: Injector,

    ) {
        super(injector);
    }

    ngOnInit() {
    }
}
