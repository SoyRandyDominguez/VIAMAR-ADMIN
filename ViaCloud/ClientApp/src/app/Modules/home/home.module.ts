// import { NgModule } from 'src/app/modules/starter/node_modules/@angular/core';
// import { CommonModule } from 'src/app/modules/starter/node_modules/@angular/common';
// import { FormsModule } from 'src/app/modules/starter/node_modules/@angular/forms';
// import { Routes, RouterModule } from 'src/app/modules/starter/node_modules/@angular/router';

import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Home Page',
            urls: [
                { title: 'Home'}
            ]
        },
        component: HomeComponent,
    }
];

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [HomeComponent]
})
export class HomeModule { }
