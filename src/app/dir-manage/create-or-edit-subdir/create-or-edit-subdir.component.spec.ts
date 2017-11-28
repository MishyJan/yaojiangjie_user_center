/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CreateOrEditSubdirComponent } from 'app/dir-manage/create-or-edit-subdir/create-or-edit-subdir.component';

describe('CreateOrEditSubdirComponent', () => {
  let component: CreateOrEditSubdirComponent;
  let fixture: ComponentFixture<CreateOrEditSubdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditSubdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditSubdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
