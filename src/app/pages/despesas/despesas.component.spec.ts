import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as dayjs from "dayjs";
import { from, throwError } from "rxjs";
import { AlertComponent, ModalFormComponent, ModalConfirmComponent, DataTableComponent, AlertType } from "src/app/shared/components";
import { DespesaDataSet } from "src/app/shared/datatable-config/despesas";
import { IDespesa } from "src/app/shared/interfaces";
import { AuthService, MenuService } from "src/app/shared/services";
import { DespesaService } from "src/app/shared/services/api";
import { SharedModule } from "src/app/shared/shared.module";
import { DespesasFormComponent } from "./despesas-form/despesas.form.component";
import { DespesasComponent } from "./despesas.component";
import { MockLocalStorage } from "__mock__";

describe('Unit Test DespesasComponent', () => {
  let component: DespesasComponent;
  let localStorageSpy: MockLocalStorage;
  let fixture: ComponentFixture<DespesasComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let despesaService: DespesaService;
  let mockDespesas: IDespesa[] = [
    { id: 1, idUsuario: 1, idCategoria: 1, data: dayjs(), descricao: 'Teste Despesas 1', valor: 1.05, dataVencimento: dayjs(), categoria: 'Categoria 1' },
    { id: 2, idUsuario: 2, idCategoria: 2, data: dayjs(), descricao: 'Teste Despesas 2', valor: 2.05, dataVencimento: dayjs(), categoria: 'Categoria 2' },
    { id: 3, idUsuario: 1, idCategoria: 4, data: dayjs(), descricao: 'Teste Despesas 3', valor: 3.05, dataVencimento: null, categoria: 'Categoria 3' },
    { id: 3, idUsuario: 15, idCategoria: 4, data: dayjs(), descricao: 'Teste Despesas 3', valor: 3.05, dataVencimento: null, categoria: 'Categoria 3' },
    { id: 3, idUsuario: 15, idCategoria: 4, data: dayjs(), descricao: 'Teste Despesas 3', valor: 3.05, dataVencimento: null, categoria: 'Categoria 3' },
  ];
  let mockDespesasData: DespesaDataSet[] = [
    { id: 1, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Despesas 1', valor: 'R$ 1.05', dataVencimento: dayjs().format('DD/MM/YYY'), categoria: 'Categoria 1' },
    { id: 2, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Despesas 2', valor: 'R$ 2.05', dataVencimento: dayjs().format('DD/MM/YYY'), categoria: 'Categoria 2' },
    { id: 3, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Despesas 3', valor: 'R$ 3.05', dataVencimento: null, categoria: 'Categroia 3' }
  ];

  beforeEach(() => {
    localStorageSpy = new MockLocalStorage();
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [DespesasComponent, DespesasFormComponent, MatDatepicker, MatSelect],
      imports: [CommonModule, RouterTestingModule, SharedModule, HttpClientTestingModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
      providers: [MenuService, AlertComponent, ModalFormComponent, ModalConfirmComponent, NgbActiveModal, DespesaService, DespesasFormComponent,
        { provide: Storage, useValue: localStorageSpy.instance() },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    fixture = TestBed.createComponent(DespesasComponent);
    component = fixture.componentInstance;
    component.dataTable = TestBed.inject(DataTableComponent);
    component.despesasData = mockDespesasData;
    despesaService = TestBed.inject(DespesaService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorageSpy.cleanup();
  });

  it('should create', () => {
    // Anrange
    localStorageSpy.setItem('idUsuario','2');

    // Assert
    expect(component).toBeTruthy();
  });

  it('should initializeDataTable', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 15;
    localStorageSpy.setItem('idUsuario', mockIdUsuario.toString());
    let despesas = mockDespesas.filter(despesa => despesa.idUsuario === mockIdUsuario);
    const getDespesasByIdUsuarioSpy = spyOn(despesaService, 'getDespesaByIdUsuario').and.returnValue(from(Promise.resolve(despesas)));

    // Act
    component.initializeDataTable();
    flush();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalledWith(mockIdUsuario);
    expect(component.despesasData.length).toBeGreaterThan(1);
  }));

  it('should initializeDataTable and return empty Datatable', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Message Datatable Despesas Empty' };
    const getDespesasByIdUsuarioSpy = spyOn(despesaService, 'getDespesaByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.initializeDataTable();
    flush();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));

  it('should throw error when try to initializeDataTable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message' };
    const getDespesasByIdUsuarioSpy = spyOn(despesaService, 'getDespesaByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.initializeDataTable();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });

  it('should updateDatatable when is called', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 2;
    localStorageSpy.setItem('idUsuario', mockIdUsuario);
    let despesas = mockDespesas.filter(despesa => despesa.idUsuario === mockIdUsuario);
    const getDespesasByIdUsuarioSpy = spyOn(despesaService, 'getDespesaByIdUsuario').and.returnValue(from(Promise.resolve(despesas)));

    // Act
    component.updateDatatable();
    flush();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalledWith(mockIdUsuario);
    expect(component.despesasData.length).toBeGreaterThan(0);
  }));

  it('should throw error when try to updateDataTable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message' };
    const getDespesasByIdUsuarioSpy = spyOn(despesaService, 'getDespesaByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.updateDatatable();

    // Assert
    expect(getDespesasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });

  it('should open modalForm on onClickNovo', fakeAsync(() => {
    // Arrange
    spyOn(component.modalForm.modalService, 'open').and.callThrough();

    // Act
    component.onClickNovo();
    flush();

    // Assert
    expect(component.modalForm.modalService.open).toHaveBeenCalled();
  }));

  it('should open ModalForm onClickEdit', fakeAsync(() => {
    // Arrange
    spyOn(component.modalForm.modalService, 'open').and.callThrough();

    // Act
    component.onClickEdit(mockDespesas[1].id);
    flush();

    // Assert
    expect(component.modalForm.modalService.open).toHaveBeenCalled();
  }));

  it('should open Modal Confirm when onClickDelete', () => {
    // Arrange
    spyOn(component.modalConfirm, 'open').and.callThrough();

    // Act
    component.onClickDelete(mockDespesas[0].id);

    // Assert
    expect(component.modalConfirm.open).toHaveBeenCalled();
  });
});
