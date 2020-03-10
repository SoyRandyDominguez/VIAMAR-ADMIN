import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnoServiciosComponent } from './turno-servicios/turno-servicios.component';
import { TurnoComponent } from './turno.component';
import { TurnoListadoComponent } from './turno-listado/turno-listado.component';
import { TurnoServicioTallerComponent } from './turno-servicios/turno-servicio-taller/turno-servicio-taller.component';
import { TurnoServicioExpresoComponent } from './turno-servicios/turno-servicio-expreso/turno-servicio-expreso.component';

const routes: Routes = [
    {
        path: '', component: TurnoComponent, children: [

            { path: '', redirectTo: 'servicios' },
            { path: 'servicios', component: TurnoServiciosComponent },
            { path: 'servicios/taller', component: TurnoServicioTallerComponent },
            { path: 'servicios/expreso', component: TurnoServicioExpresoComponent },
            { path: 'llamadas', component: TurnoListadoComponent },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TurnoRoutingModule { }
