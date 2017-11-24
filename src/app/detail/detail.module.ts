import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailRoutes } from 'app/detail/detail.routing';
import { YaojiangjieService } from 'shared/services/yaojiangjie-mock.service';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutes
  ],
  declarations: [DetailComponent],
  providers: [
    YaojiangjieService
  ]
})
export class DetailModule { }