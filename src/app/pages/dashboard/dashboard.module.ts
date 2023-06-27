import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@NgModule({
  providers: [],
  declarations: [DashboardComponent, LayoutComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [LayoutComponent]
})
export class DashboardModule {}
