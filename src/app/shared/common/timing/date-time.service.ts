﻿import { AppLocalizationService } from 'app/shared/common/localization/app-localization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {

    constructor(private _appLocalizationService: AppLocalizationService) {

    }

    createDateRangePickerOptions(): any {
        const options = {
            locale: {
                format: 'L',
                applyLabel: this._appLocalizationService.l('Apply'),
                cancelLabel: this._appLocalizationService.l('Cancel'),
                customRangeLabel: this._appLocalizationService.l('CustomRange')
            },
            min: moment('2015-05-01'),
            minDate: moment('2015-05-01'),
            max: moment(),
            maxDate: moment(),
            ranges: {}
        };

        options.ranges[this._appLocalizationService.l('Today')] = [moment().startOf('day'), moment().endOf('day')];
        options.ranges[this._appLocalizationService.l('Yesterday')] = [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
        options.ranges[this._appLocalizationService.l('Last7Days')] = [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')];
        options.ranges[this._appLocalizationService.l('Last30Days')] = [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')];
        options.ranges[this._appLocalizationService.l('ThisMonth')] = [moment().startOf('month'), moment().endOf('month')];
        options.ranges[this._appLocalizationService.l('LastMonth')] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

        return options;
    }
}
