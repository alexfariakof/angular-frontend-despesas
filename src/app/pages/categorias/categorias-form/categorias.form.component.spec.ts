import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CategoriasFormComponent } from './categorias.form.component';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { of, throwError } from 'rxjs';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';

describe('Unit Test CategoriasFormComponent', () => {
  let component: CategoriasFormComponent;
  let fixture: ComponentFixture<CategoriasFormComponent>;
  let categoriaService: CategoriaService;
  let alertComponent: AlertComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule ],
      providers: [FormBuilder, AlertComponent, NgbActiveModal, CategoriaService]
    });
    fixture = TestBed.createComponent(CategoriasFormComponent);
    component = fixture.componentInstance;
    categoriaService = TestBed.inject(CategoriaService);
    alertComponent = TestBed.inject(AlertComponent);
    localStorage.setItem('idUsuario', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should create categoria and show successfully message', () => {
    // Arrange
    const categoria: ICategoria = { id: 0, descricao: 'Teste categoria Despesa.', idUsuario: 1, idTipoCategoria: 1 };
    const categoriaServiceSpy = spyOn(categoriaService, 'postCategoria').and.returnValue(of({ message: true }));
    const modalCloseSpy = spyOn(component.activeModal, 'close').and.callThrough();
    const spyRefresh = spyOn(component, "setRefresh");
    const alertOpenSpy = spyOn(alertComponent, 'open').and.callThrough();
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Create);
    component.setRefresh(() => { });
    component.categoriatForm.patchValue(categoria);
    component.onSaveClick();

    // Assert
    expect(categoriaServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(categoria));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(spyRefresh).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Categoria cadastrada com Sucesso.', 'Success');
  });

  it('should edit categoria and show successfully message', () => {
    // Arrange
    const categoria : ICategoria = { id: 1, descricao: "Teste categoria", idUsuario: 1,  idTipoCategoria: 2  };
    const categoriaServiceSpy = spyOn(categoriaService, 'putCategoria').and.returnValue(of(categoria));
    const modalCloseSpy = spyOn(component.activeModal, 'close').and.callThrough();;
    const spyRefresh = spyOn(component, "setRefresh");
    const alertOpenSpy = spyOn(alertComponent, 'open').and.callThrough();
    spyOn(localStorage, 'getItem').and.returnValue('123');
    spyOn(component, 'onSaveClick').and.callThrough();

    // Act
    component.ngOnInit();
    component.setAction(IAction.Edit);
    component.setRefresh(() => {});
    component.categoriatForm.patchValue(categoria);
    component.onSaveClick();

    // Assert
    expect(categoriaServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(categoria));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(spyRefresh).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Categoria alterada com Sucesso.', 'Success');
  });

  it('should call try create categoria throw error and show error message', fakeAsync(() => {
    // Arrange
    const categoria : ICategoria = { id: 0, descricao: "Teste categoria", idUsuario: 1,  idTipoCategoria: 2  };
    const errorMessage = 'Fake Error Message';
    spyOn(categoriaService, 'postCategoria').and.callFake(()=>{ throw Error }).and.throwError(errorMessage);
    const alertOpenSpy = spyOn(alertComponent, 'open');

    // Act
    component.ngOnInit();
    component.categoriatForm.patchValue(categoria);
    component.onSaveClick();

    // Assert
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage, 'Warning');
  }));

  it('should return FormGroup', () => {
    // Arrange
    const categoria : ICategoria = { id: 1, descricao: "Teste categoria", idUsuario: 1,  idTipoCategoria: 2  };
    const spyFormGroup = spyOn(component, 'setCategoria').and.callThrough();;

    // Act
    component.ngOnInit();
    const formGroup = component.setCategoria(categoria);

    // Assert
    expect(spyFormGroup).toHaveBeenCalled();
  });

  it('should throw error when try to postCategoria', fakeAsync(() => {
    // Arrange
    const categoria : ICategoria = { id: 0, descricao: "Teste categoria", idUsuario: 1,  idTipoCategoria: 2  };
    const errorMessage = 'Fake Error Message';
    spyOn(categoriaService, 'postCategoria').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(alertComponent, 'open');

    // Act
    component.ngOnInit();
    component.categoriatForm.patchValue(categoria);
    component.onSaveClick();

    // Assert
    expect(alertOpenSpy).toHaveBeenCalled();
  }));

  it('should throw error when try to putCategoria', fakeAsync(() => {
    // Arrange
    const categoria : ICategoria = { id: 0, descricao: "Teste categoria", idUsuario: 1,  idTipoCategoria: 2  };
    const errorMessage = 'Fake Error Message';
    spyOn(categoriaService, 'putCategoria').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(alertComponent, 'open');

    // Act
    component.ngOnInit();
    component.categoriatForm.patchValue(categoria);
    component.setAction(IAction.Edit);
    component.onSaveClick();

    // Assert
    expect(alertOpenSpy).toHaveBeenCalled();
  }));
});
