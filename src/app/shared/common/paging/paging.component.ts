import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConsts } from '../../../AppConsts';

@Component({
    selector: 'yaojiangjie-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
    allPartSizeArr: number[] = [];
    page: any;
    head: any;
    @Input() exhibitionData: string[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params
            .subscribe(result => {
                this.page = result.page;
            })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.exhibitionData) {
            this.countAllPartMaxSize(this.exhibitionData);
        }
    }

    prevPage(): void {
        this.page--;
        this.countPaging();
        window.location.href = `${AppConsts.appBaseUrl}/detail/${this.page}`;
        // this._router.navigate(['/detail/info', this.head, this.page]);
    }

    nextPage(): void {
        this.page++;
        this.countPaging();
        window.location.href = `${AppConsts.appBaseUrl}/detail/${this.page}`;
        // this._router.navigate(['/detail/info', this.head, this.page]);
    }


    private countPaging(): void {
        if (this.page <= 0) {
            if (this.page <= 0 || this.page == undefined) {
                this.page = 1;
            }
            return;
        } else if (this.page >= this.allPartSizeArr[0]) {
            this.page = this.allPartSizeArr[0];
        }
    }

    //   计算目录每部分的最大值
    private countAllPartMaxSize(catalogs): void {
        
        catalogs.catalog.forEach(subCatalog => {
            this.allPartSizeArr.push(+catalogs.catalog[catalogs.catalog.length - 1].value);
        });
    }
}
