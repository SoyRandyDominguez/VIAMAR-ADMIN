import { NgSelectModule } from '@ng-select/ng-select';



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

    ], exports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ]

})
export class SharedModule { }
