import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitaListadoComponent } from './citas/cita-listado/cita-listado.component';
import { CitaFormularioComponent } from './citas/cita-formulario/cita-formulario.component';


const routes: Routes = [
    { path: '', redirectTo: 'citas', pathMatch: "full" },
    {
        path: 'citas',
        data: {
            title: 'ViaCloud | Citas',
            urls: [
                { title: 'Servicios', },
                { title: 'Citas' }
            ]
        },
        component: CitaListadoComponent,
    },
    {
        path: 'citas/:id',
        data: {
            title: 'ViaCloud | Formulario de citas',
            urls: [
                { title: 'Servicios', },
                { title: 'Citas', url: "/servicios/citas" },
                { title: 'Formulario de citas' }
            ]
        },
        component: CitaFormularioComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiciosRoutingModule { }
