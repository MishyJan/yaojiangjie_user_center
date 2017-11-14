/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YaojiangjieService } from './yaojiangjie.service';

describe('Service: Yaojiangjie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YaojiangjieService]
    });
  });

  it('should ...', inject([YaojiangjieService], (service: YaojiangjieService) => {
    expect(service).toBeTruthy();
  }));
});