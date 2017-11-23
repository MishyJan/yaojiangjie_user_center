import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail/detail.component';
import { PageComponent } from './page/page.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        {
            path: '',
            component: AppComponent,
            children: [
                {
                    path: 'detail/:part/:page',
                    component: DetailComponent
                },
                {
                    path: 'page',
                    component: PageComponent
                }
            ]
        }
      ])
    ],
    exports: [
      RouterModule
    ]
  })

export class AppRoutes {}
