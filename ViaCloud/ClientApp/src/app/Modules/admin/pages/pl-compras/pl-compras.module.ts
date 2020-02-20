import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlComprasRoutingModule } from './pl-compras-routing.module';
import { PlComprasComponent } from './pl-compras.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PlComprasComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    PlComprasRoutingModule,NgbModule
  ]
})
export class PlComprasModule { }
