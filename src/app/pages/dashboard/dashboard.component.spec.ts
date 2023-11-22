import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from 'src/app/shared/components/bar-chart/bar-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['createAccessToken', 'isAuthenticated']);
    mockAuthService.createAccessToken.and.returnValue(true);
    mockAuthService.isAuthenticated.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent, BarChartComponent],
      imports: [ CommonModule, SharedModule,  NgChartsModule ],
      providers: [MenuService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
