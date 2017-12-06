import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { YaojiangjieService } from 'shared/services/yaojiangjie-mock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'yaojiangjie-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    animations: [appModuleAnimation()]

})
export class DetailComponent implements OnInit {
    detailData: any;
    exhibitionData: any;
    part: number;
    page: number;

    constructor(
        private _yaojiangjieService: YaojiangjieService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getDetailPage();
    }

    getDetailPage(): void {
        this._route.params
            .subscribe(result => {
                this.part = result.part;
                this.page = result.page;
                this.loadData(result);
            });
    }

    loadData(result: object): void {
        this._yaojiangjieService
            .getDetailInfo(result, (res: any) => {
                this.detailData = res;
                // document.getElementsByTagName("title")[0].innerHTML = res.name;
            });

        this._yaojiangjieService
            .getExhibitionInfo((res: any) => {
                this.exhibitionData = res;
            });
    }

}
