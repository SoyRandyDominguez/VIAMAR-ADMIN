import { NgSelectModule } from '@ng-select/ng-select';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        //OwlDateTimeModule, OwlNativeDateTimeModule,
        //BrowserAnimationsModule
    ], exports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        //OwlDateTimeModule, OwlNativeDateTimeModule,
        //BrowserAnimationsModule
    ]

})
export class SharedModule { }
