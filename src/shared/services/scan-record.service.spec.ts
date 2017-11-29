/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScanRecordService } from './scan-record.service';

describe('Service: ScanRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScanRecordService]
    });
  });

  it('should ...', inject([ScanRecordService], (service: ScanRecordService) => {
    expect(service).toBeTruthy();
  }));
});