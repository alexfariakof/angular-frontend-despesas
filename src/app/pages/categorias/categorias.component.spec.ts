import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { from, throwError, of } from "rxjs";
import { AlertComponent, ModalFormComponent, ModalConfirmComponent, DataTableComponent, AlertType } from "src/app/shared/components";
import { CategoriaDataSet } from "src/app/shared/datatable-config/categorias";
import { ICategoria } from "src/app/shared/interfaces";
import { AuthService, MenuService } from "src/app/shared/services";
import { CategoriaService } from "src/app/shared/services/api";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriasFormComponent } from "./categorias-form/categorias.form.component";
import { CategoriasComponent } from "./categorias.component";


describe('Unit Test CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let categoriaService: CategoriaService;
  let mockCategoriaData: CategoriaDataSet = { id: 1, descricao: 'Teste Categoria', tipoCategoria: 'Despesas' };
  let mockCategoria: ICategoria = { id: 1, descricao: 'Teste Categoria Despesas', idTipoCategoria: 1, idUsuario: 1 };
  let mockCategorias: ICategoria[] = [
    { id: 1, descricao: 'Teste Categoria Despesas', idTipoCategoria: 1, idUsuario: 1 },
    { id: 2, descricao: 'Teste Categoria Receitas', idTipoCategoria: 2, idUsuario: 1 }
  ];

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [CategoriasComponent, CategoriasFormComponent],
      imports: [CommonModule, ReactiveFormsModule, MdbFormsModule, SharedModule, HttpClientTestingModule ],
      providers: [MenuService, AlertComponent, ModalFormComponent, ModalConfirmComponent,  NgbActiveModal, CategoriaService,
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
    // Assert
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
    expect(getCategoriasSpy).toHaveBeenCalled();
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

  it('should throws error when try to initializeDataTable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message'};
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.initializeDataTable();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
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

  it('should throws error when try to updateDatatable', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message'};
    const getCategoriasSpy = spyOn(categoriaService, 'getCategorias').and.returnValue(throwError(errorMessage));;
    const alertOpenSpy = spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.updateDatatable();

    // Assert
    expect(getCategoriasSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });

  it('should return categoriasData on getCategoriasData', () => {
    // Arrange & Act
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

  it('should getCategoriaById when onClickEdit and call editCategoria', fakeAsync(() => {
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

  it('should do nothing when onClickEdit return null Categoria', fakeAsync(() => {
    // Arrange
    const getReceitasById = spyOn(categoriaService, 'getCategoriaById').and.returnValue(of(null));
    const editCategoriaSpy = spyOn(component, 'editCategoria').and.callThrough();

    // Act
    component.onClickEdit(0);
    flush();

    // Assert
    expect(getReceitasById).toHaveBeenCalled();
    expect(editCategoriaSpy).not.toHaveBeenCalled();
  }));

  it('should throw error when onClickEdit ', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message' };
    const getCategoriaByIdSpy = spyOn(categoriaService, 'getCategoriaById').and.returnValue(throwError(errorMessage));;
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.onClickEdit(mockCategoria.id);
    tick();
    flush();

    // Assert
    expect(getCategoriaByIdSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));

  it('should open modalConfirm when onDeleteClick', () => {
    // Arrange
    spyOn(component.modalConfirm, 'open').and.callThrough();

    // Act
    component.onClickDelete(mockCategoria.id);

    // Assert
    expect(component.modalConfirm.open).toHaveBeenCalled();
  });

  it('should  deleteCategoria and open modal alert success', fakeAsync(() => {
    // Arrange
    const getDeleteCategoria = spyOn(categoriaService, 'deleteCategoria').withArgs(mockCategoria.id).and.returnValue(of({message: true}));
    spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.deleteCategoria(mockCategoria.id);
    tick();
    flush();

    // Assert
    expect(getDeleteCategoria).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalledWith(AlertComponent, 'Categoria excluída com sucesso', AlertType.Success);
  }));

  it('should try deleteCategoria throw error and open modal alert warning', fakeAsync(() => {
    // Arrange
    const getDeleteCategoria = spyOn(categoriaService, 'deleteCategoria').withArgs(mockCategoria.id).and.returnValue(of({message: false}));
    spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.deleteCategoria(mockCategoria.id);
    tick();
    flush();

    // Assert
    expect(getDeleteCategoria).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalled();
    expect(component.modalAlert.open).toHaveBeenCalledWith(AlertComponent, 'Erro ao excluír categoria', AlertType.Warning);
  }));

  it('should throw error when deleteCategoria ', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message' };
    const getDeleteCategoria = spyOn(categoriaService, 'deleteCategoria').and.returnValue(throwError(errorMessage));;
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.deleteCategoria(mockCategoria.id);
    tick();
    flush();

    // Assert
    expect(getDeleteCategoria).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));
});
