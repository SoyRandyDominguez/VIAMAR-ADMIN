import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './core/layouts/full/full.component';
import { LoginComponent } from './Modules/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { BlankComponent } from './core/layouts/blank/blank.component';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home', loadChildren: () => import('./Modules/home/home.module').then(m => m.HomeModule),
            },
            {
                path: 'servicios', loadChildren: () => import('./Modules/servicios/servicios.module').then(m => m.ServiciosModule)
            },


        ],
    },
    {
        path: 'login',
        data: {
            title: 'ViaCloud | Login',
        },
        component: LoginComponent
    },
    {
        path: 'turno',
        component: BlankComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'servicios', pathMatch: 'full' },
            {
                path: 'servicios', loadChildren: () => import('./Modules/turno/turno.module').then(m => m.TurnoModule)
            },
        ],
    },
    //{
    //    path: '**',
    //    redirectTo: '/login'
    //},

];
@NgModule({
    imports: [RouterModule.forRoot(Approutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
