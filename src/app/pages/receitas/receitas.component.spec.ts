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
import { AlertComponent, ModalFormComponent, ModalConfirmComponent, DataTableComponent } from "src/app/shared/components";
import { ReceitaDataSet } from "src/app/shared/datatable-config/receitas";
import { IReceita } from "src/app/shared/interfaces";
import { AuthService, MenuService } from "src/app/shared/services";
import { ReceitaService } from "src/app/shared/services/api";
import { SharedModule } from "src/app/shared/shared.module";
import { ReceitasFormComponent } from "./receitas-form/receitas.form.component";
import { ReceitasComponent } from "./receitas.component";

describe('Unit Test ReceitasComponent', () => {
  let component: ReceitasComponent;
  let fixture: ComponentFixture<ReceitasComponent>;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let receitaService: ReceitaService;
  let mockReceitas: IReceita[] = [
    { id: 1, idUsuario: 1, idCategoria: 1, data: dayjs(), descricao: 'Teste Receitas 1', valor: 1.05, categoria: 'Categoria 1' },
    { id: 2, idUsuario: 2, idCategoria: 2, data: dayjs(), descricao: 'Teste Receitas 2', valor: 2.05, categoria: 'Categoria 2' },
    { id: 3, idUsuario: 1, idCategoria: 4, data: dayjs(), descricao: 'Teste Receitas 3', valor: 3.05, categoria: 'Categoria 3' },
  ];
  let mockReceitasData: ReceitaDataSet[] = [
    { id: 1, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Receitas 1', valor: 'R$ 1.05', categoria: 'Categoria 1' },
    { id: 2, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Receitas 2', valor: 'R$ 2.05', categoria: 'Categoria 2' },
    { id: 3, data: dayjs().format('DD/MM/YYYY'), descricao: 'Teste Receitas 3', valor: 'R$ 3.05', categoria: 'Categroia 3' }
  ];

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [ReceitasComponent, ReceitasFormComponent, MatDatepicker, MatSelect],
      imports: [CommonModule, RouterTestingModule, SharedModule, HttpClientTestingModule, MatSelectModule , MatDatepickerModule, MatNativeDateModule],
      providers: [MenuService, AlertComponent, ModalFormComponent, ModalConfirmComponent, NgbActiveModal, ReceitaService, ReceitasFormComponent,
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
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initializeDataTable', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 1;
    let receitas = mockReceitas.filter(receita => receita.idUsuario === mockIdUsuario);
    const getReceitasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(from(Promise.resolve(receitas)));
    spyOn(component, 'getReceitasData').and.returnValue(mockReceitasData);
    localStorageSpy['idUsuario'] = mockIdUsuario.toString();

    // Act
    component.initializeDataTable();
    flush();

    // Assert
    expect(getReceitasByIdUsuarioSpy).toHaveBeenCalled();
    expect(component.receitasData.length).toBeGreaterThan(1);
  }));

  it('should initializeDataTable and return empty Datatable', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Empty DataTable Receitas'};
    const getReceitasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(throwError(errorMessage));
    spyOn(component, 'getReceitasData').and.returnValue(mockReceitasData);
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '2';

    // Act
    component.initializeDataTable();
    flush();

    // Assert
    expect(getReceitasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  }));

  it('should throw error when try to initializeDataTable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message initialize DataTable Receitas'};
    const getReceitasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '4';

    // Act
    component.initializeDataTable();

    // Assert
    expect(getReceitasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should return receitaData when call getReceitasData', () => {
    // Arrange
    localStorageSpy['idUsuario'] = '1';
    component.receitasData = mockReceitasData;

    // Act
    let receitasData =  component.getReceitasData();

    // Assert
    expect(receitasData).not.toBeNull();
    expect(receitasData.length).toBeGreaterThan(0);
  });

  it('should updateDatatable when is called', fakeAsync(() => {
    // Arrange
    let mockIdUsuario = 2;
    let receitas = mockReceitas.filter(receita => receita.idUsuario === mockIdUsuario);
    const getReceitasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(from(Promise.resolve(receitas)));
    spyOn(component, 'getReceitasData').and.returnValue(mockReceitasData);
    localStorageSpy['idUsuario'] = mockIdUsuario.toString();

    // Act
    component.updateDatatable();
    flush();

    // Assert
    expect(getReceitasByIdUsuarioSpy).toHaveBeenCalled();
    expect(component.receitasData.length).toBeGreaterThan(0);

  }));

  it('should throw error when try to updateDataTable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Recitas UpdateDataTable'};
    const getReceitasByIdUsuarioSpy = spyOn(receitaService, 'getReceitaByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '4';

    // Act
    component.updateDatatable();

    // Assert
    expect(getReceitasByIdUsuarioSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
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

  it('should open modalform onClickEdit', () => {
    // Arrange
    spyOn(component.modalForm.modalService, 'open').and.callThrough();

    // Act
    component.onClickEdit(mockReceitas[0].id);

    // Assert
    expect(component.modalForm.modalService.open).toHaveBeenCalled();
  });

  it('should open Modal Confirm when onClickDelete', () => {
    // Arrange
    spyOn(component.modalConfirm, 'open').and.callThrough();

    // Act
    component.onClickDelete(mockReceitas[0].id);

    // Assert
    expect(component.modalConfirm.open).toHaveBeenCalled();
  });

});
