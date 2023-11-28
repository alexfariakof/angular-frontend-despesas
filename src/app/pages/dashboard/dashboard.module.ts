import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import { BarChartComponent } from "src/app/shared/components";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
@NgModule({
  providers: [],
  declarations: [DashboardComponent, BarChartComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, NgChartsModule]
})
export class DashboardModule {}
