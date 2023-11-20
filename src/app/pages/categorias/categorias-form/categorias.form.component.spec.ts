import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { CategoriasFormComponent } from './categorias.form.component';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { of } from 'rxjs';

describe('CategoriasFormComponent', () => {
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
    //fixture.detectChanges();
  });

  it('should create', () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should create categoria and show successfully message', fakeAsync(() => {
    // Arrange
    const categoriaServiceSpy = spyOn(categoriaService, 'createCategoria').and.returnValue(of({ message: true }));
    const modalCloseSpy = spyOn(component.activeModal, 'close').and.callThrough();;
    const alertOpenSpy = spyOn(alertComponent, 'open').and.callThrough();


    spyOn(component, 'onSaveClick').and.callThrough();

    spyOn(component, "refresh").and.callFake(function () {
      console.log("fake reload");
    });

    // Act
    component.ngOnInit();
    component.createCategoriatForm.setValue({
      slctTipoCategoria: '1',
      txtDescricao: 'Teste categoria Despesa.',
    });

    component.onSaveClick();
    tick();
    flush();

    // Assert
    expect(categoriaServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining({ descricao: 'Teste categoria Despesa.' }));
    expect(modalCloseSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Categoria cadastrada com Sucesso.', 'Success');
  }));

  it('should call try create categoria throw error and show error message', fakeAsync(() => {
    // Arrange
    const errorMessage = 'Fake Error Message';
    spyOn(categoriaService, 'createCategoria').and.callFake(()=>{ throw Error}).and.throwError(errorMessage);
    const alertOpenSpy = spyOn(alertComponent, 'open');

    // Act
    component.ngOnInit();
    component.createCategoriatForm.setValue({
      slctTipoCategoria: '1',
      txtDescricao: 'Teste categoria Despesa.',
    });

    component.onSaveClick();

    // Assert
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage, 'Warning');
  }));

});

