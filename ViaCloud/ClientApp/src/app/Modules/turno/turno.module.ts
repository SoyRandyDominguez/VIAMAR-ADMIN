import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoComponent } from './turno.component';
import { TurnoListadoComponent } from './turno-listado/turno-listado.component';
import { TurnoHomeComponent } from './turno-home/turno-home.component';
import { TurnoServiciosComponent } from './turno-servicios/turno-servicios.component';


@NgModule({
  declarations: [TurnoComponent, TurnoListadoComponent, TurnoHomeComponent, TurnoServiciosComponent],
  imports: [
    CommonModule,
    TurnoRoutingModule
  ]
})
export class TurnoModule { }
