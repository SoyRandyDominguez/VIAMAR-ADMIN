import { NgSelectModule } from '@ng-select/ng-select';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ], exports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        DatePickerModule
    ]

})
export class SharedModule { }
