import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConsts } from '../../../AppConsts';
import { CatalogModalComponent } from '../../../shared/common/paging/catalog-modal/catalog-modal.component';

@Component({
    selector: 'yaojiangjie-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
    subCatalogData: any;
    allPartSizeArr: number[] = [];
    part: number;
    page: number;
    @Input() exhibitionData: any;
    @ViewChild('catalogModal') catalogModal: CatalogModalComponent;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params
            .subscribe(result => {
                this.page = result.page;
                this.part = result.part;
            })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.exhibitionData) {
            this.countAllPartMaxSize(this.exhibitionData);
        }
    }

    showCatalog(): void {
        this.catalogModal.showCatalogModel();
    }

    prevPage(): void {
        this.page--;
        this.countPaging();
        window.location.href = `${AppConsts.appBaseUrl}/detail/${this.part}/${this.page}`;
    }

    nextPage(): void {
        this.page++;
        this.countPaging();
        window.location.href = `${AppConsts.appBaseUrl}/detail/${this.part}/${this.page}`;
    }

    // 翻页核心代码
    private countPaging(): void {
        if (this.page > this.allPartSizeArr[this.part-1]) {
            this.part++;
            if (this.part >= this.allPartSizeArr.length) {
                this.part = this.allPartSizeArr.length;
            }
            this.page = 1;
        }

        if (this.page <= 0) {
            this.part--;
            if (this.part <= 0) {
                this.part = 1;
            }
            this.page = 1;
        }
    }

    //   计算目录每部分的最大值
    private countAllPartMaxSize(catalogs): void {
        catalogs.catalog.subCatalog.forEach(subCatalog => {
            this.allPartSizeArr.push(+subCatalog.item[subCatalog.item.length - 1].value);
        });
    }
}
