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
                { title: 'Servicios', url: "/servicios" },
                { title: 'Citas' }
            ]
        },
        component: CitaListadoComponent,
    },
    {
        path: 'citas/:id',
        data: {
            title: 'ViaCloud | Citas Formulario',
            urls: [
                { title: 'Servicios', url: "/servicios" },
                { title: 'Citas Formulario' }
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
