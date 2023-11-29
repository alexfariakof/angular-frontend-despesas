import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { from, throwError, of } from 'rxjs';
import { AlertComponent } from 'src/app/shared/components';
import { ICategoria, IDespesa, IAction } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services';
import { DespesaService } from 'src/app/shared/services/api';
import { DespesasFormComponent } from './despesas.form.component';


describe('Unit Test DespesasFormComponent', () => {
  let component: DespesasFormComponent;
  let fixture: ComponentFixture<DespesasFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let despesaService: DespesaService;
  let mockDespesas: IDespesa[] = [
    { id: 1, idUsuario: 1, idCategoria: 1, data: dayjs(), descricao: 'Teste Despesas 1', valor: 1.05, dataVencimento: dayjs(), categoria: 'Categoria 1' },
    { id: 2, idUsuario: 2, idCategoria: 2, data: dayjs(), descricao: 'Teste Despesas 2', valor: 2.05, dataVencimento: dayjs(), categoria: 'Categoria 2' },
    { id: 3, idUsuario: 1, idCategoria: 4, data: dayjs(), descricao: 'Teste Despesas 3', valor: 3.05, dataVencimento: dayjs(), categoria: 'Categoria 3' },
  ];
  let mockCategorias: ICategoria[] = [
    { id: 1, descricao: 'Teste Categoria Despesas 1', idTipoCategoria: 1, idUsuario: 1 },
    { id: 2, descricao: 'Teste Categoria Despesas 2', idTipoCategoria: 2, idUsuario: 1 }
  ];

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [DespesasFormComponent, MatDatepicker, MatSelect],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatFormFieldModule, MatInputModule, MatSelectModule , MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule, CurrencyMaskModule],
      providers: [FormBuilder, AlertComponent, NgbActiveModal, DespesaService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(DespesasFormComponent);
    component = fixture.componentInstance;
    despesaService = TestBed.inject(DespesaService);
    localStorage.setItem('idUsuario', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should getCategorias ', fakeAsync(() => {
    // Arrange
    const mockIdUsuario = 1;
    const getCategoriasSpy = spyOn(despesaService, 'getCategorias').and.returnValue(from(Promise.resolve(mockCategorias)));

    // Act
    component.ngOnInit();
    component.getCatgeoriasFromDespesas();
    flush();
    fixture.detectChanges();
    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(getCategoriasSpy).toHaveBeenCalledWith(mockIdUsuario);
    expect(component.categorias.length).toBeGreaterThan(1);
  }));

  it('should thorws errro when call getCategorias and open modal alert ', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message'};
    const mockIdUsuario = 1;
    const getCategoriasSpy = spyOn(despesaService, 'getCategorias').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.getCatgeoriasFromDespesas();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should Save despesa onSaveClick with Action is Create and show successfully message', fakeAsync(() => {
    // Arrange
    const despesa: IDespesa = {
      id: 0,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs(),
      descricao: 'Teste Create Despesas',
      valor: 100.88,
      dataVencimento: null,
      categoria: ''
    };
    const despesaPostServiceSpy = spyOn(despesaService, 'postDespesa').and.returnValue(of({ message: true }));
    const modalCloseSpy = spyOn(component.activeModal, 'close').and.callThrough();
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.action = IAction.Create;
    component.refresh = () => { console.log('Fake Refresh Despesas');};
    component.despesaForm.patchValue(despesa);
    component.onSaveClick();
    flush();

    // Assert
    expect(despesaPostServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(despesa));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Despesa cadastrada com Sucesso.', 'Success');
  }));

  it('should throws error when try to create despesa and show error message', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Create Despesa'};
    const despesa: IDespesa = {
      id: 0,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs(),
      descricao: 'Teste Create Despesas',
      valor: 100.88,
      dataVencimento: null,
      categoria: ''
    };
    const despesaPostServiceSpy = spyOn(despesaService, 'postDespesa').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.action = IAction.Create;
    component.refresh = () => { console.log('Fake Refresh Despesas'); };
    component.despesaForm.patchValue(despesa);
    component.onSaveClick();

    // Assert
    expect(despesaPostServiceSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should Save despesa onSaveClick with Action is Edit', fakeAsync(() => {
    // Arrange
    const mockDespesa: IDespesa = {
      id: 1,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs().format('YYYY-MM-DD'),
      descricao: 'Teste Edit Despesas',
      valor: 10.58,
      dataVencimento: null,
      categoria: null
    };
    const despesaPutServiceSpy = spyOn(despesaService, 'putDespesa').and.returnValue(of({ message: true, despesa: mockDespesa }));
    const modalCloseSpy = spyOn(component.activeModal, 'close').and.callThrough();
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.action = IAction.Edit;
    component.refresh = () => { console.log('Fake Refresh Despesas'); };
    component.despesaForm.patchValue(mockDespesa);
    component.onSaveClick();
    flush();

    // Assert
    expect(despesaPutServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(mockDespesa));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Despesa alterada com Sucesso.', 'Success');
  }));


  it('should throws error when try to edit despesa and show error message', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Edit Despesa'};
    const despesa: IDespesa = {
      id: 1,
      idUsuario: 2,
      idCategoria: 2,
      data: dayjs().format('YYYY-MM-DD'),
      descricao: 'Teste Edit Despesas',
      valor: 20.42,
      dataVencimento: dayjs().format('YYYY-MM-DD'),
      categoria: ''
    };
    const despesaPutServiceSpy = spyOn(despesaService, 'putDespesa').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.action = IAction.Edit;
    component.refresh = () => { console.log('Fake Refresh Despesas'); };
    component.despesaForm.patchValue(despesa);
    component.onSaveClick();

    // Assert
    expect(despesaPutServiceSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should show error message when onClickSave', () => {
    // Arrange
    const errorMessage = Error('Ação não pode ser realizada.');
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();

    // Act
    component.ngOnInit();
    component.action = undefined;
    component.onSaveClick();

    // Assert
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should execute editDespesa and setFormDespesas', fakeAsync(() => {
    // Arrange
    const mockDespesa: IDespesa = mockDespesas[0];
    const mockResponse: any = { message: true, despesa: mockDespesa };
    const getDespesasById = spyOn(despesaService, 'getDespesaById').and.returnValue(from(Promise.resolve(mockResponse)));
    const editDespesa = spyOn(component, 'editDespesa').and.callThrough();

    // Act
    component.editDespesa(mockDespesa.id);
    flush();

    // Assert
    expect(getDespesasById).toHaveBeenCalled();
    expect(editDespesa).toHaveBeenCalled();
    expect(editDespesa).toHaveBeenCalledWith(mockDespesa.id);
  }));

  it('should throws error on editDespesa', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Edit Despesa'};
    const mockDespesa: IDespesa = mockDespesas[1];
    const getDespesasById = spyOn(despesaService, 'getDespesaById').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.editDespesa(mockDespesa.id);
    flush();

    // Assert
    expect(getDespesasById).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  }));

  it('should  deleteDespesa and open modal alert success', fakeAsync(() => {
    // Arrange
    const mockResponse = { message: true };
    const getDeleteDespesa = spyOn(despesaService, 'deleteDespesa').and.returnValue(from(Promise.resolve(mockResponse)));
    spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.deleteDespesa(mockDespesas[1].id, () => { console.log('Fake Call Back'); });
    flush();

    // Assert
    expect(getDeleteDespesa).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalledWith(AlertComponent, 'Despesa excluída com sucesso', 'Success');
  }));

  it('should try to deleteDespesa and open modal alert warning', fakeAsync(() => {
    // Arrange
    const mockResponse = { message: false };
    const getDeleteDespesa = spyOn(despesaService, 'deleteDespesa').and.returnValue(from(Promise.resolve(mockResponse)));
    spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.deleteDespesa(mockDespesas[2].id, () => { console.log('Fake Call Back'); });
    flush();

    // Assert
    expect(getDeleteDespesa).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalledWith(AlertComponent, 'Erro ao excluír despesa', 'Warning');
  }));

  it('should throws error when try to deleteDespesa and open modal alert warning', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Delete Despesa'};
    const spyOnDeleteDespesa = spyOn(despesaService, 'deleteDespesa').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.deleteDespesa(mockDespesas[1].id, () => { console.log('Fake Call Back'); });
    flush();

    // Assert
    expect(spyOnDeleteDespesa).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  }));

});
