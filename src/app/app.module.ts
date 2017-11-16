import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { AppCommonModule } from './shared/app-common.module';
import { AppComponent } from './app.component';
import { AppPreBootstrap } from './AppPreBootstrap';
import { AppRoutes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { DetailComponent } from './detail/detail.component';
import { HttpModule } from '@angular/http';
import { LangService } from '../service/change-lang.service';
import { YaojiangjieService } from '../service/yaojiangjie.service';

export function appInitializerFactory(injector: Injector) {
    return () => {
        AppPreBootstrap.run();
    };
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
