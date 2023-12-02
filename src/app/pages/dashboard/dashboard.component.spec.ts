import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';
import { AlertComponent, AlertType, BarChartComponent } from 'src/app/shared/components';
import { AuthService, MenuService } from 'src/app/shared/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/shared/services/api';
import { from, throwError } from 'rxjs';
import * as dayjs from 'dayjs';
describe('Unit Test DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockDashboardService: DashboardService;

  let mockLabels: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  let mockDatasets: any[] = [
    { label: 'Despesas', data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { label: 'Receitas', data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] }
  ]

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['createAccessToken', 'isAuthenticated']);
    mockAuthService.createAccessToken.and.returnValue(true);
    mockAuthService.isAuthenticated.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent, BarChartComponent],
      imports: [CommonModule, SharedModule, NgChartsModule, HttpClientTestingModule],
      providers: [MenuService, AlertComponent, NgbActiveModal,
        { provide: Storage, useValue: localStorageSpy },
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.barChartLabels = mockLabels;
    component.barChartDatasets = mockDatasets;
    localStorage.setItem('idUsuario', '1');
    mockDashboardService = TestBed.inject(DashboardService);
    localStorageSpy.getItem.and.callFake((key: string) => localStorageSpy[key]);
    localStorageSpy.setItem.and.callFake((key: string, value: string) => localStorageSpy[key] = value);
    localStorageSpy.removeItem.and.callFake((key: string) => delete localStorageSpy[key]);
    localStorageSpy.clear.and.callFake(() => {
      for (const key in localStorageSpy) {
        if (localStorageSpy.hasOwnProperty(key)) {
          delete localStorageSpy[key];
        }
      }
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeChart', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 1;
    let mockChartData = { labels: mockLabels, datasets: mockDatasets };
    const spyOnGetDataGraphicByYear = spyOn(mockDashboardService, 'getDataGraphicByYear').and.returnValue(from(Promise.resolve(mockChartData)));
    spyOn(component, 'updateChart').and.callThrough();
    localStorageSpy['idUsuario'] = mockIdUsuario.toString();

    // Act
    component.initializeChart();
    flush();

    // Assert
    expect(spyOnGetDataGraphicByYear).toHaveBeenCalled();
    expect(component.barChartDatasets.length).toBeGreaterThan(1);
    expect(component.barChartLabels.length).toBeGreaterThan(11);
  }));

  it('should throw error when try to initializeChart', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Initialize Chart' };
    const spyOnGetDataGraphicByYear = spyOn(mockDashboardService, 'getDataGraphicByYear').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '4';

    // Act
    component.initializeChart();

    // Assert
    expect(spyOnGetDataGraphicByYear).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });

  it('should updateChart', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 1;
    let mockChartData = { labels: mockLabels, datasets: mockDatasets };
    const spyOnGetDataGraphicByYear = spyOn(mockDashboardService, 'getDataGraphicByYear').and.returnValue(from(Promise.resolve(mockChartData)));
    spyOn(component, 'updateChart').and.callThrough();
    localStorageSpy['idUsuario'] = mockIdUsuario.toString();

    // Act
    component.barraFerramenta.filterAnoService.dataAno = dayjs().format('YYYY-MM-DD');
    component.updateChart();
    flush();

    // Assert
    expect(spyOnGetDataGraphicByYear).toHaveBeenCalled();
    expect(component.barChartDatasets.length).toBeGreaterThan(1);
    expect(component.barChartLabels.length).toBeGreaterThan(11);
  }));

  it('should throw error when try to updateChart', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Update Chart' };
    const spyOnGetDataGraphicByYear = spyOn(mockDashboardService, 'getDataGraphicByYear').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '4';

    // Act
    component.updateChart();

    // Assert
    expect(spyOnGetDataGraphicByYear).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });
});
