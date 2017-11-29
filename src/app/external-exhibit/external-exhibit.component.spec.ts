/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ExternalExhibitComponent } from './external-exhibit.component';

describe('ExternalExhibitComponent', () => {
  let component: ExternalExhibitComponent;
  let fixture: ComponentFixture<ExternalExhibitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalExhibitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalExhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
