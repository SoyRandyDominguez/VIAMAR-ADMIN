import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitaListadoComponent } from './citas/cita-listado/cita-listado.component';


const routes: Routes = [
    { path: '', redirectTo: 'citas', pathMatch: "full" },
    {
        path: 'citas',
        data: {
            title: 'Citas Page',
            urls: [
                { title: 'Servicios', url: "/servicios" },
                { title: 'Citas' }
            ]
        },
        component: CitaListadoComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiciosRoutingModule { }
