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
import { from, of } from 'rxjs';
import RefreshService from 'src/app/shared/services/utils/refersh-service/refresh.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal.confirm.component';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { CategoriaDataSet } from 'src/app/shared/datatable-config/categorias/categoria.dataSet';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let categoriaService: CategoriaService;
  let mockCategoriaData : CategoriaDataSet = {id:1, descricao: 'Teste Categoria', tipoCategoria: 'Despesas'};
  let mockCategoria : ICategoria = {id: 1, descricao: 'Teste Categoria Despesas', idTipoCategoria: 1, idUsuario: 1};
  let mockCategorias: ICategoria[] = [
    {id: 1, descricao: 'Teste Categoria Despesas', idTipoCategoria: 1, idUsuario: 1},
    {id: 2, descricao: 'Teste Categoria Receitas', idTipoCategoria: 2, idUsuario: 1},

  ]

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [CategoriasComponent, CategoriasFormComponent],
      imports: [CommonModule, ReactiveFormsModule,  SharedModule, HttpClientTestingModule ],
      providers: [MenuService, AlertComponent, ModalFormComponent, ModalConfirmComponent,  NgbActiveModal, CategoriaService, RefreshService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    component.dataTable = TestBed.inject(DataTableComponent);
    component.catgoriasData = [mockCategoriaData];
    categoriaService = TestBed.inject(CategoriaService);
    spyOn(component, 'getCategoriasData').and.returnValue([mockCategoriaData]);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data table on ngOnInit', () => {
    // Arrange
    const initializeDataTableSpy = spyOn(component, 'initializeDataTable').and.callThrough();
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.returnValue(from(Promise.resolve(mockCategorias)));
    // Act
    component.ngOnInit();

    // Assert
    expect(initializeDataTableSpy).toHaveBeenCalled();
    expect(component.catgoriasData.length).toBeGreaterThan(0);
  });

  it('should initializeDataTable', () => {
    // Arrange
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.returnValue(from(Promise.resolve(mockCategorias)));
    // Act
    component.initializeDataTable();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(component.catgoriasData.length).toBeGreaterThan(0);
  });

  it('should update data table on updateDatatable', () => {
    // Arrange
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.returnValue(from(Promise.resolve(mockCategorias)));

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
    expect(result[0].tipoCategoria).toEqual('Despesas');
  });

  it('should open modalForm on onClickNovo', () => {
    // Arrange
    spyOn(component.modalForm.modalService, 'open').and.callThrough();

    // Act
    component.onClickNovo();

    // Assert
    expect(component.modalForm.modalService.open).toHaveBeenCalled();
  });


  it('should getCategoria when onClickEdit and execcute editCategoria', fakeAsync(() => {
    // Arrange
    const getCategoriaByIdSpy = spyOn(categoriaService, 'getCategoriaById').and.returnValue(from(Promise.resolve(mockCategoria)));
    const editCategoriaSpy = spyOn(component, 'editCategoria').and.callThrough();

    // Act
    component.onClickEdit(mockCategoria.id);
    tick();
    flush();

    // Assert
    expect(getCategoriaByIdSpy).toHaveBeenCalled();
    expect(editCategoriaSpy).toHaveBeenCalledWith(mockCategoria);
  }));

  it('should open modalConfirm when onDeleteClick', () => {
    spyOn(component.modalConfirm, 'open').and.callThrough();

    // Act
    component.onClickDelete(mockCategoria.id);

    // Assert
    expect(component.modalConfirm.open).toHaveBeenCalled();
  });


  it('should execute deleteCategoria and open modal alert', fakeAsync(() => {
    const getCategoriaByIdSpy = spyOn(categoriaService, 'deleteCategoria').withArgs(mockCategoria.id).and.returnValue(from(Promise.resolve(of({message: true}))));
    spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.deleteCategoria(mockCategoria.id);
    tick();
    flush();

    // Assert
    expect(component.modalAlert.open).toHaveBeenCalled();
  }));


});
