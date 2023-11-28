import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReceitasFormComponent } from './receitas.form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import * as dayjs from 'dayjs';
import { from, throwError, of } from 'rxjs';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { IReceita } from 'src/app/shared/interfaces/IReceita';
import { ReceitaService } from 'src/app/shared/services/api/receitas/receita.service';

describe('Unit Test ReceitasFormComponent', () => {
  let component: ReceitasFormComponent;
  let fixture: ComponentFixture<ReceitasFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let receitaService: ReceitaService;
  let mockCategorias: ICategoria[] = [
    { id: 1, descricao: 'Teste Categoria Recaita 1', idTipoCategoria: 1, idUsuario: 1 },
    { id: 2, descricao: 'Teste Categoria Receita 2', idTipoCategoria: 2, idUsuario: 1 }
  ];

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [ReceitasFormComponent, MatDatepicker, MatSelect],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatFormFieldModule, MatInputModule, MatSelectModule , MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule, CurrencyMaskModule],
      providers: [FormBuilder, AlertComponent, NgbActiveModal, ReceitaService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(ReceitasFormComponent);
    component = fixture.componentInstance;
    receitaService = TestBed.inject(ReceitaService);
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
    const getCategoriasSpy = spyOn(receitaService, 'getCategorias').and.returnValue(from(Promise.resolve(mockCategorias)));

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
    const getCategoriasSpy = spyOn(receitaService, 'getCategorias').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.getCatgeorias();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should Save receita onSaveClick with Action is Create and show successfully message', fakeAsync(() => {
    // Arrange
    const receita: IReceita = {
      id: 0,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs(),
      descricao: 'Teste Create Receitas',
      valor: 10.23,
      categoria: ''
    };
    const receitaPostServiceSpy = spyOn(receitaService, 'postReceita').and.returnValue(of({ message: true }));
    const modalCloseSpy = spyOn(component.activeModal, 'close').and.callThrough();
    const spyRefresh = spyOn(component, "setRefresh");
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Create);
    component.setRefresh(() => { });
    component.receitaForm.patchValue(receita);
    component.onSaveClick();
    flush();

    // Assert
    expect(receitaPostServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(receita));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(spyRefresh).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Receita cadastrada com Sucesso.', 'Success');
  }));

  it('should throws error when try to create receita and show error message', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Create Receita'};
    const receita: IReceita = {
      id: 0,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs(),
      descricao: 'Teste Create Receitas',
      valor: 200.99,
      categoria: ''
    };
    const receitaPostServiceSpy = spyOn(receitaService, 'postReceita').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Create);
    component.setRefresh(() => { });
    component.receitaForm.patchValue(receita);
    component.onSaveClick();

    // Assert
    expect(receitaPostServiceSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });
});
