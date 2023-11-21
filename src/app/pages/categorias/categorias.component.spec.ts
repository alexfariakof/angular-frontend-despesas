import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { CategoriasComponent } from './categorias.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { from } from 'rxjs';
import RefreshService from 'src/app/shared/services/utils/refersh-service/refresh.service';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockcategoriasData;
  let categoriaService: CategoriaService;
  const mockCategoria = {id:1, descricao: 'Teste Categoria', tipoCategoria: 'Despesas'};

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [CategoriasComponent, CategoriasFormComponent],
      imports: [CommonModule, ReactiveFormsModule,  SharedModule, HttpClientTestingModule ],
      providers: [MenuService, AlertComponent, ModalFormComponent, NgbActiveModal, CategoriaService, RefreshService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    component.catgoriasData = [mockCategoria];
    categoriaService = TestBed.inject(CategoriaService);

    spyOn(component, 'getCategoriasData').and.returnValue([mockCategoria]);
    //fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data table on ngOnInit', () => {
    // Arrange
    const initializeDataTableSpy = spyOn(component, 'initializeDataTable').and.callThrough();

    // Act
    component.ngOnInit();

    // Assert
    expect(initializeDataTableSpy).toHaveBeenCalled();
    expect(component.catgoriasData.length).toBeGreaterThan(0);
  });

  it('should initializeDataTable', () => {
    // Arrange
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.callThrough();;

    // Act
    component.initializeDataTable();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(component.catgoriasData.length).toBeGreaterThan(0);
  });

  it('should update data table on updateDatatable', () => {
    // Arrange
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.callThrough();

    // Act
    component.updateDatatable();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(component.catgoriasData.length).toBeGreaterThan(0);
  });

  it('should return categoriasData on getCategoriasData', () => {
    // Act
    const result = component.getCategoriasData();

    // Assert
    expect(result).toEqual(component.catgoriasData);
  });

  it('should parse categorias to CategoriaData on parseToCategoriaData', () => {
    // Arrange
    const categorias: ICategoria[] = [{ id: 1, descricao: 'Teste Categoria', idUsuario: 1,  idTipoCategoria: 1 }];

    // Act
    const result = component.parseToCategoriaData(categorias);

    // Assert
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toEqual(categorias[0].id);
    expect(result[0].descricao).toEqual(categorias[0].descricao);
    expect(result[0].tipoCategoria).toEqual('Despesas'); // Certifique-se de ajustar conforme necessário
  });

  it('should open modalForm on onClickNovo', () => {
    // Arrange
    spyOn(component.modalForm.modalService, 'open').and.callThrough();

    // Act
    component.onClickNovo();

    // Assert
    expect(component.modalForm.modalService.open).toHaveBeenCalled();
    //expect(modalRefSpy.componentInstance.setAction).toHaveBeenCalledWith(IAction.Create);
    //expect(modalRefSpy.componentInstance.setRefresh).toHaveBeenCalled();
  });

  it('should open modalForm onClickEdit', fakeAsync(() => {
    // Arrange
    const categoria = [{
      id: 1,
      descricao: 'Teste Categoria',
      idUsuario: 1,
      idTipoCategoria: 1
    }];

    const modalRefSpy = jasmine.createSpyObj('modalRef', ['shown', 'componentInstance', 'close']);
    spyOn(component.modalForm.modalService, 'open').and.returnValue(modalRefSpy).and.callThrough();
    spyOn(categoriaService, 'getCategoriaById').and.returnValue(from(Promise.resolve(categoria))).and.callThrough();

    // Act
    component.onClickEdit(1);
    tick();
    flush();

    // Assert
    expect(component.modalForm.modalService.open).toHaveBeenCalled();
    expect(modalRefSpy.componentInstance.setAction).toHaveBeenCalledWith(IAction.Edit);
    expect(modalRefSpy.componentInstance.setRefresh).toHaveBeenCalled();
    expect(modalRefSpy.componentInstance.getCategoriaForm().get('idCategoria').value).toEqual(categoria[0].id);
    expect(modalRefSpy.componentInstance.getCategoriaForm().get('txtDescricao').value).toEqual(categoria[0].descricao);
    expect(modalRefSpy.componentInstance.getCategoriaForm().get('slctTipoCategoria').value).toEqual(categoria[0].idTipoCategoria);
  }));

  it('should delete categoria and show success message on onClickDelete', fakeAsync(() => {
    // Arrange
    const message = { message: true };
    const deleteCategoriaSpy = spyOn(categoriaService, 'deleteCategoria').and.returnValue(from(Promise.resolve(message)));
    const modalAlertSpy = spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.onClickDelete(1);
    tick();
    flush();

    // Assert
    expect(deleteCategoriaSpy).toHaveBeenCalled();
    expect(modalAlertSpy).toHaveBeenCalledWith(AlertComponent, 'Categoria excluída com sucesso', 'Success');
  }));

  it('should handle error on onClickDelete', fakeAsync(() => {
    // Arrange
    const errorMessage = 'Fake Error Message';
    spyOn(categoriaService, 'deleteCategoria').and.returnValue(from(Promise.resolve({message:false})));
    const modalAlertSpy = spyOn(component.modalAlert, 'open');

    // Act
    component.onClickDelete(1);
    tick();

    // Assert
    expect(modalAlertSpy).toHaveBeenCalled();
    //expect(modalAlertSpy).toHaveBeenCalledWith(AlertComponent, errorMessage, 'Warning');
  }));


});
