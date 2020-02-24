import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { PlComprasRoutingModule } from './pl-compras-routing.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { PlComprasComponent } from './pl-compras.component';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { MatTabsModule, MatInputModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [PlComprasComponent],
  imports: [
      NgSelectModule,
      MatSelectModule,
      CommonModule, MatTableModule,
      SecondaryToolbarModule, PageLayoutModule, MatTabsModule, ReactiveFormsModule, FormsModule, MatInputModule, MatIconModule,
      BreadcrumbsModule,
    PlComprasRoutingModule,
    SecondaryToolbarModule,
    ContainerModule
  ]
})
export class PlComprasModule {
}
