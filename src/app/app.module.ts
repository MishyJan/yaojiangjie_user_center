import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AppCommonModule } from './shared/app-common.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
    declarations: [
        AppComponent,
        DetailComponent
    ],
    imports: [
        BrowserModule,
        AppCommonModule.forRoot(),
        AppRoutes
    ],
    providers: [
    ]
})
export class AppModule { }
