import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail/detail.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        {
            path: '',
            component: AppComponent,
            children: [
                {
                    path: 'detail',
                    component: DetailComponent
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
