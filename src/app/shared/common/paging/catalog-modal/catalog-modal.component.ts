import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'yaojiangjie-catalog-modal',
    templateUrl: './catalog-modal.component.html',
    styleUrls: ['./catalog-modal.component.scss']
})
export class CatalogModalComponent implements OnInit {
    subCatalogData: any;
    isShowCatalogModel: boolean = false;
    part: number;
    page: number;

    @Input() exhibitionData: any;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {

    }
    ngOnChanges(changes: SimpleChanges) {
        if(this.exhibitionData) {
            this._route.params
            .subscribe(result => {
                this.part = result.part;
                this.page = result.page - 1;

                this.exhibitionData.catalog.subCatalog.forEach(element => {
                    if (element.value == this.part) {
                        this.subCatalogData = element.item;
                    }
                });
            })
        }
    }

    hideCatalogModel(event: Event): void {
        event.stopPropagation();
        this.isShowCatalogModel = false;
    }

    stopPropagation(event: Event): void {
        event.stopPropagation();
    }

    // 跳转页码详情页
    toPageDetail(page: number): void {
        let url = `/detail/${this.part}/${page + 1}`;
        this._router.navigate([url]);
        this.isShowCatalogModel = false;
    }

    public showCatalogModel(): void {
        this.isShowCatalogModel = true;
    }
}
