import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './core/layouts/full/full.component';
import { LoginComponent } from './Modules/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

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
