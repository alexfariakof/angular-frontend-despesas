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
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IDespesa } from 'src/app/shared/interfaces/IDespesa';
import * as dayjs from 'dayjs';
import { IAction } from 'src/app/shared/interfaces/IAction';

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
      declarations: [DespesasFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MdbFormsModule ],
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

  it('should create despesa onSaveClick and show successfully message', fakeAsync(() => {
    // Arrange
    const despesa: IDespesa = {
      id: 0,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs(),
      descricao: 'Teste Create Despesas',
      valor: 100.88,
      dataVencimento: null
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
    component.despesatForm.patchValue(despesa);
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
    const errorMessage = { message: 'Fake Error Message'};
    const despesa: IDespesa = {
      id: 0,
      idUsuario: 1,
      idCategoria: 1,
      data: dayjs(),
      descricao: 'Teste Create Despesas',
      valor: 100.88,
      dataVencimento: null
    };
    const despesaPostServiceSpy = spyOn(despesaService, 'postDespesa').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Create);
    component.setRefresh(() => { });
    component.despesatForm.patchValue(despesa);
    component.onSaveClick();

    // Assert
    expect(despesaPostServiceSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, 'Warning');
  });

  it('should call onCategoriaChangeConvertValueToNumber when idCategoria is chenged', fakeAsync(() => {
    // Arrange
    const onChangeIdCategoria = spyOn(component, 'onCategoriaChangeConvertValueToNumber').and.callThrough();
    spyOn(despesaService, 'getCategorias').and.returnValue(from(Promise.resolve(mockCategorias)));

    // Act
    component.ngOnInit();
    flush();
    fixture.detectChanges();
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('#idCategoria');
    selectElement.value = '1';
    selectElement.dispatchEvent(new Event('change'))

    // Assert
    expect(component.onCategoriaChangeConvertValueToNumber).toHaveBeenCalled();
    expect(component.despesatForm.value.idCategoria).toBe(1);
  }));
});
