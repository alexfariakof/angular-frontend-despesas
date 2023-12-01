import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgChartsModule } from "ng2-charts";
import { AlertComponent, BarChartComponent } from "src/app/shared/components";
import { AuthService, MenuService } from "src/app/shared/services";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

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
      imports: [ CommonModule, SharedModule,  NgChartsModule, HttpClientTestingModule ],
      providers: [MenuService, AlertComponent, NgbActiveModal,
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
