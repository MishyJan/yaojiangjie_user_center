import { AppComponentBase } from "shared/common/app-component-base";
import { Injector, Component, OnInit } from "@angular/core";

@Component({
    selector: 'xiaoyuyue-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent extends AppComponentBase implements OnInit {
    constructor
        (
        injector: Injector
        ) {
        super(injector);
    }

    ngOnInit() {
    }
}
