﻿import { AutoFocusDirective } from './auto-focus.directive'
import { BusyIfDirective } from './busy-if.directive';
import { ButtonBusyDirective } from './button-busy.directive'
import { CurrencyInputDirective } from './currency-input.directive';
import { EqualValidator } from './validation/equal-validator.directive';
import { MinValueValidator } from './validation/min-value-validator.directive';
import { MomentFormatPipe } from './moment-format.pipe';
import { NgModule } from '@angular/core';
import { PasswordComplexityValidator } from './validation/password-complexity-validator.directive'

@NgModule({
    providers: [
    ],
    declarations: [
        EqualValidator,
        PasswordComplexityValidator,
        MinValueValidator,
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective,
        MomentFormatPipe,
        CurrencyInputDirective
    ],
    exports: [
        EqualValidator,
        PasswordComplexityValidator,
        MinValueValidator,
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective,
        MomentFormatPipe,
        CurrencyInputDirective
    ]
})
export class UtilsModule { }