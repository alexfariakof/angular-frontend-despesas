import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from 'src/app/shared/components/bar-chart/bar-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MenuService } from 'src/app/shared/services/menu.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, BarChartComponent],
      imports: [ CommonModule, DashboardRoutingModule, SharedModule,  NgChartsModule ],
      providers: [MenuService]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
