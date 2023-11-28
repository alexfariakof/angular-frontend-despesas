import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { DespesasFormComponent } from './despesas.form.component';
import { DespesaService } from 'src/app/shared/services/api/despesas/despesa.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { from, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { IDespesa } from 'src/app/shared/interfaces/IDespesa';
import * as dayjs from 'dayjs';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule  } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';

describe('Unit Test DespesasFormComponent', () => {
  let component: DespesasFormComponent;
  let fixture: ComponentFixture<DespesasFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let despesaService: DespesaService;
  let mockCategorias: ICategoria[] = [
    { id: 1, descricao: 'Teste Categoria Despesas', idTipoCategoria: 1, idUsuario: 1 },
    { id: 2, descricao: 'Teste Categoria Receitas', idTipoCategoria: 2, idUsuario: 1 }
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
    component.getCatgeorias();
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
    component.getCatgeorias();

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
    const spyRefresh = spyOn(component, "setRefresh");
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Create);
    component.setRefresh(() => { });
    component.despesaForm.patchValue(despesa);
    component.onSaveClick();
    flush();

    // Assert
    expect(despesaPostServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(despesa));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(spyRefresh).toHaveBeenCalled();
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
    component.setAction(IAction.Create);
    component.setRefresh(() => { });
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
    const spyRefresh = spyOn(component, "setRefresh");
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Edit);
    component.setRefresh(() => { });
    component.despesaForm.patchValue(mockDespesa);
    component.onSaveClick();
    flush();

    // Assert
    expect(despesaPutServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(mockDespesa));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(spyRefresh).toHaveBeenCalled();
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
    component.setAction(IAction.Edit);
    component.setRefresh(() => { });
    component.despesaForm.patchValue(despesa);
    component.onSaveClick();

    // Assert
    expect(despesaPutServiceSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should throws error when onClickSave and show error message', () => {
    // Arrange
    const errorMessage = Error('Fake Error Message Edit Despesa');
    spyOn(despesaService, 'postDespesa').and.throwError(errorMessage);
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();

    // Act
    component.ngOnInit();
    component.onSaveClick();

    // Assert
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

});
