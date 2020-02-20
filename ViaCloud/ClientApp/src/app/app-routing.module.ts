import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from './core/authentication/guard/authguard.guard';


const routes: Routes = [
    {
        path: '', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule), data: { breadcrumb: 'Home' },
        canActivate: [AuthguardGuard]
    }, 

    { path: 'login', loadChildren: () => import('./Modules/login/login.module').then(m => m.LoginModule) },
    //{ path: '**', redirectTo: 'error404' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
