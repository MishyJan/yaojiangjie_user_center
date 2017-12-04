import { Component, OnInit, Injector } from '@angular/core';
import { appModuleSlowAnimation } from 'shared/animations/routerTransition';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ScanServiceProxy, PagedResultDtoOfCatalogListDto, CatalogListDto } from 'shared/service-proxies/service-proxies';
import { LocalStorageService } from 'shared/services/local-storage.service';
import { AppConsts } from 'shared/AppConsts';
import { Router } from '@angular/router';

@Component({
    selector: 'yaojiangjie-looked-exhibit',
    templateUrl: './looked-exhibit.component.html',
    styleUrls: ['./looked-exhibit.component.scss'],
    animations: [appModuleSlowAnimation()]
})
export class LookedExhibitComponent extends AppComponentBase implements OnInit {
    allDirSelectData: CatalogListDto[];
    /* 获取所有目录DTO */
    dirName: string;
    skipCount: number = 0;
    maxResultCount: number = AppConsts.grid.defaultPageSize;
    sorting: string
    constructor(
        private injector: Injector,
        private _router: Router,
        private _scanServiceProxy: ScanServiceProxy,
        private _localStorageService: LocalStorageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getAllDir();
    }

    // 获取所有目录
    getAllDir(): void {
        this._localStorageService.getItem('allDirSelectData', () => {
            return this._scanServiceProxy
                .getAllCatalog(
                this.dirName,
                this.sorting,
                this.maxResultCount,
                this.skipCount
                )
        }).then((result: PagedResultDtoOfCatalogListDto) => {
            this.allDirSelectData = result.items;
        })
    }

    toDirPath(id: number): void {
        let url = `/dir-manage/edit/${id}`;
        this._router.navigate([url]);
    }

}
