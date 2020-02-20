import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlComprasComponent } from './pl-compras.component';

const routes: Routes = [{ path: '', component: PlComprasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlComprasRoutingModule { }
