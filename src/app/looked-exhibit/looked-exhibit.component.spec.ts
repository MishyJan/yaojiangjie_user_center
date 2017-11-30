/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LookedExhibitComponent } from './looked-exhibit.component';

describe('LookedExhibitComponent', () => {
  let component: LookedExhibitComponent;
  let fixture: ComponentFixture<LookedExhibitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookedExhibitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookedExhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
