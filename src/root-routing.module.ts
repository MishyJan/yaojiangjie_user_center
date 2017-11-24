import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { NgModule } from '@angular/core';

const routes: Routes = [

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule {
    // 提前 注册 BreadcrumbService
    constructor(private breadcrumbService: BreadcrumbService) {

    }
}
