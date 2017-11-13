import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { AppModule } from './app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root.component';
import { Router, ChildrenOutletContexts } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RootRoutingModule } from './root.routing';
import { AppCommonModule } from './app/shared/app-common.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RootRoutingModule,
        AppCommonModule.forRoot(),
        AppModule,
    ],
    declarations: [
        RootComponent
    ],
    providers: [
        // ChildrenOutletContexts
    ],
    bootstrap: [RootComponent]
})
export class RootModule {

}