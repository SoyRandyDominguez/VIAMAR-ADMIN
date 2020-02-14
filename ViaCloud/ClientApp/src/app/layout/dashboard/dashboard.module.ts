import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { DashBoardCardsComponent } from './dash-board-cards/dash-board-cards.component';

@NgModule({
  declarations: [DashboardComponent, DashBoardCardsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
  ]
})
export class DashboardModule { }
