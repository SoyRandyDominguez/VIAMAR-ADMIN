import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnoHomeComponent } from './turno-home/turno-home.component';
import { TurnoServiciosComponent } from './turno-servicios/turno-servicios.component';
import { TurnoComponent } from './turno.component';
import { TurnoListadoComponent } from './turno-listado/turno-listado.component';

const routes: Routes = [
    {
        path: '', component: TurnoComponent, children: [

            { path: '', redirectTo: 'servicios' },
            { path: 'servicios', component: TurnoServiciosComponent },
            { path: 'llamadas', component: TurnoListadoComponent },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TurnoRoutingModule { }
