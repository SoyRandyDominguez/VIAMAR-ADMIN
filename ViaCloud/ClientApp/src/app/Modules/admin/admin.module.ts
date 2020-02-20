



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from 'src/app/Modules/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BreadCrumbComponent } from './components/BreadCrumb/BreadCrumb.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LeftAsideComponent } from '../../shared/component/left-aside/left-aside.component';
import { HeaderComponent } from '../../shared/component/header/header.component';
import { FooterComponent } from '../../shared/component/footer/footer.component';

@NgModule({
    declarations: [AdminComponent,
        FooterComponent,
        HeaderComponent,
        LeftAsideComponent,
        BreadCrumbComponent,
        InicioComponent],
    imports: [
        CommonModule,
        BreadcrumbModule,
        AdminRoutingModule,
    ],
})
export class AdminModule { }
