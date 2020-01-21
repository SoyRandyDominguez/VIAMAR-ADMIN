import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavBarComponent } from './menu/nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxPermissionsModule.forChild(),
  ]
})
export class LayoutModule { }
