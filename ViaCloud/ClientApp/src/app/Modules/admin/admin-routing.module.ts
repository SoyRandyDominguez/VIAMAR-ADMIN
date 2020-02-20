import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from 'src/app/Modules/admin/admin.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix',data: { breadcrumb: 'Inicio'}},
      { path: 'inicio', component: InicioComponent ,data: { breadcrumb: 'Inicio'}}
      ,{ path: 'pl-compras', loadChildren: () => import('./pages/pl-compras/pl-compras.module').then(m => m.PlComprasModule) ,data: { breadcrumb: 'Compras'}}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
