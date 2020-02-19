import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [

  //{
  //  path: '',
  //  component: UsuariosComponent,
  //  children: [
  //    { path: '', component: UsuarioListadoComponent },
  //    { path: 'usuario/:id', component: UsuarioTabsComponent },

  //  ]
    //}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
