import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { CitaListadoComponent } from './citas/cita-listado/cita-listado.component';
import { CitaFormularioComponent } from './citas/cita-formulario/cita-formulario.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ServiciosComponent, CitaListadoComponent, CitaFormularioComponent,],
    imports: [
        CommonModule,
        SharedModule,
        ServiciosRoutingModule
    ]
})
export class ServiciosModule { }
