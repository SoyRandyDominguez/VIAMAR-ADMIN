import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from 'src/app/Modules/admin/admin.component';
import { FooterComponent } from 'src/app/core/sharedComponents/footer/footer.component';
import { HeaderComponent } from 'src/app/core/sharedComponents/header/header.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LeftAsideComponent } from 'src/app/core/sharedComponents/left-aside/left-aside.component';
import { BreadCrumbComponent } from './components/BreadCrumb/BreadCrumb.component';
import {BreadcrumbModule} from 'angular-crumbs';
import { InicioComponent } from './pages/inicio/inicio.component';

@NgModule({
  declarations: [AdminComponent,FooterComponent,
    HeaderComponent, LeftAsideComponent,BreadCrumbComponent, InicioComponent],
  imports: [
    CommonModule,BreadcrumbModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
