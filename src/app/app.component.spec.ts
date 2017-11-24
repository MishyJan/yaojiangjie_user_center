/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { RootModule } from '../root.module';

describe('App: Xiaoyuyue', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RootModule
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
