import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReceitasComponent } from './receitas.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import * as dayjs from 'dayjs';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal.confirm.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { ReceitaDataSet } from 'src/app/shared/datatable-config/receitas/receitas.dataSet';
import { IReceita } from 'src/app/shared/interfaces/IReceita';
import { ReceitaService } from 'src/app/shared/services/api/receitas/receita.service';
import { from, throwError } from 'rxjs';

describe('ReceitasComponent', () => {
  let component: ReceitasComponent;
  let fixture: ComponentFixture<ReceitasComponent>;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let receitaService: ReceitaService;
  let mockReceitas: IReceita[] = [
    { id: 1, idUsuario: 1, idCategoria: 1, data: dayjs(), descricao: 'Teste Despesas 1', valor: 1.05, categoria: 'Categoria 1' },
    { id: 2, idUsuario: 2, idCategoria: 2, data: dayjs(), descricao: 'Teste Despesas 2', valor: 2.05, categoria: 'Categoria 2' },
    { id: 3, idUsuario: 1, idCategoria: 4, data: dayjs(), descricao: 'Teste Despesas 3', valor: 3.05, categoria: 'Categoria 3' },
  ];
  let mockReceitasData: ReceitaDataSet[] = [
    { id: 1, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Despesas 1', valor: 'R$ 1.05', categoria: 'Categoria 1' },
    { id: 2, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Despesas 2', valor: 'R$ 2.05', categoria: 'Categoria 2' },
    { id: 3, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Despesas 3', valor: 'R$ 3.05', categoria: 'Categroia 3' }
  ];

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [ReceitasComponent, MatDatepicker, MatSelect],
      imports: [CommonModule, RouterTestingModule, SharedModule, HttpClientTestingModule, MatSelectModule , MatDatepickerModule, MatNativeDateModule],
      providers: [MenuService, AlertComponent, ModalFormComponent, ModalConfirmComponent, NgbActiveModal, ReceitaService,
        { provide: Storage, useValue: localStorageSpy },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    fixture = TestBed.createComponent(ReceitasComponent);
    component = fixture.componentInstance;
    localStorage.setItem('idUsuario', '1');
    component.dataTable = TestBed.inject(DataTableComponent);
    receitaService = TestBed.inject(ReceitaService);
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

  it('should initializeDataTable', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 1;
    let receitas = mockReceitas.filter(despesa => despesa.idUsuario === mockIdUsuario);
    const getDespesasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(from(Promise.resolve(receitas)));
    spyOn(component, 'getReceitasData').and.returnValue(mockReceitasData);
    localStorageSpy['idUsuario'] = mockIdUsuario.toString();

    // Act
    component.initializeDataTable();
    flush();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(component.receitasData.length).toBeGreaterThan(1);
  }));

  it('should initializeDataTable and return empty Datatable', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Receitas'};
    const getDespesasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(throwError(errorMessage));
    spyOn(component, 'getReceitasData').and.returnValue(mockReceitasData);
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '2';

    // Act
    component.initializeDataTable();
    flush();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  }));


  it('should throw error when try to initializeDataTable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Receitas'};
    const getDespesasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '4';

    // Act
    component.initializeDataTable();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });
});
