import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { ActivatedRoute } from '@angular/router';
import { YaojiangjieService } from '../../service/yaojiangjie.service';
import { AppConsts } from '../AppConsts';
import { Detail, Choice, ExhibitsIntro } from '../../shared/common-dto/detail';
import { LangService } from '../../service/change-lang.service';

@Component({
    selector: 'yaojiangjie-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    animations: [appModuleAnimation()]

})
export class DetailComponent implements OnInit {
    detailData: Detail = new Detail();
    exhibitionData: any;
    page: number;

    constructor(
        private _route: ActivatedRoute,
        private _yaojiangjieService: YaojiangjieService,
        public langService: LangService
    ) {
        langService.change.subscribe(() => {
            this.getDetailPage();
        })
    }

    ngOnInit() {
        this.detailData.choice = new Choice();
        this.detailData.desc = new ExhibitsIntro();
        this.getDetailPage();
    }

    getDetailPage(): void {
        this._route.params
            .subscribe(result => {
                this.page = result.page;
                this.loadData(result);
            });
    }

    loadData(result: object): void {
        let self = this;
        this._yaojiangjieService
            .getDetailInfo(result, (res: Detail) => {
                self.detailData = res;
                document.getElementsByTagName("title")[0].innerHTML = res.name;
            });

        this._yaojiangjieService
            .getExhibitionInfo(function (res) {
                self.exhibitionData = res;
            });
    }
}
