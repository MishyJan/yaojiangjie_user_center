import { Pipe, PipeTransform } from '@angular/core';

import { MomentInput } from 'moment';

@Pipe({ name: 'momentFormat' })
export class MomentFormatPipe implements PipeTransform {
    transform(value: MomentInput, format: string) {
        return moment(value).format(format);
    }
}
