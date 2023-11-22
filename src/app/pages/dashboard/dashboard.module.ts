import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BarChartComponent } from 'src/app/shared/components/bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  providers: [],
  declarations: [DashboardComponent, BarChartComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, NgChartsModule]
})
export class DashboardModule {}
