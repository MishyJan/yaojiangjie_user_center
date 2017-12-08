import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'yaojiangjie-externalExhibit',
    templateUrl: './external-exhibit.component.html',
    styleUrls: ['./external-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class ExternalExhibitComponent extends AppComponentBase implements OnInit {
    @ViewChild('exhibitIframe') exhibitIframe: ElementRef;
    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
    ) {
        super(injector);
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                if (params['exhibitUrl']) {
                    this.exhibitIframe.nativeElement.src = params['exhibitUrl'];
                }
            });
    }
}
