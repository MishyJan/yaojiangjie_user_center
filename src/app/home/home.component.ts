import { AfterViewInit, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent extends AppComponentBase implements OnInit {

    public constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }
}

