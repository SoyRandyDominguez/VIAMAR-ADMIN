// import { NgModule } from 'src/app/modules/starter/node_modules/@angular/core';
// import { CommonModule } from 'src/app/modules/starter/node_modules/@angular/common';
// import { FormsModule } from 'src/app/modules/starter/node_modules/@angular/forms';
// import { Routes, RouterModule } from 'src/app/modules/starter/node_modules/@angular/router';

import { CitasComponent } from './citas.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Citas Page',
            urls: [
                { title: 'Citas' }
            ]
        },
        component: CitasComponent,
        //canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [CitasComponent]
})
export class CitasModule { }
