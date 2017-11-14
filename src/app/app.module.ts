import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AppCommonModule } from './shared/app-common.module';
import { DetailComponent } from './detail/detail.component';
import { AppPreBootstrap } from './AppPreBootstrap';
import { YaojiangjieService } from '../service/yaojiangjie.service';
import { HttpModule } from '@angular/http';
import { LangService } from '../service/change-lang.service';

export function appInitializerFactory(injector: Injector) {
    return () => {
        AppPreBootstrap.run();
    }
}
@NgModule({
    declarations: [
        AppComponent,
        DetailComponent
    ],
    imports: [
        HttpModule,
        BrowserModule,
        AppCommonModule.forRoot(),
        AppRoutes
    ],
    providers: [
        YaojiangjieService,
        LangService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [Injector],
            multi: true
        }
    ]
})
export class AppModule { }
