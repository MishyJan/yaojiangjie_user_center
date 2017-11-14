import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LangService {
    change: EventEmitter<null>;

    constructor() {
        this.change = new EventEmitter();
    }

}