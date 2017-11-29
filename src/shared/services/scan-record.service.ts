import { Injectable } from '@angular/core';
import { LocalStorageService } from 'shared/services/local-storage.service';

@Injectable()
export class ScanRecordService {

    constructor(
        private _scanService: ScanRecordService,
        private _localStorageService: LocalStorageService
    ) { }

}