import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasComponent } from './categorias.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockcategoriasData;
  let categoriaService: CategoriaService;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [CategoriasComponent, CategoriasFormComponent],
      imports: [CommonModule, ReactiveFormsModule,  SharedModule, HttpClientTestingModule ],
      providers: [MenuService, AlertComponent, ModalFormComponent, NgbActiveModal, CategoriaService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    component.catgorias = [{id:0, descricao: 'Teste Categoria', idUsuario: 1, idTipoCategoria: 1}];
    categoriaService = TestBed.inject(CategoriaService);

    spyOn(component, 'getCategoriasData').and.returnValue([{ id: 1, descricao: 'Teste Categoria', tipoCategoria: 'Despesa' }]);
    fixture.detectChanges();
  });

  it('should Test All ', () => {
    // Arrange
    //const spyOnGetCategorias = spyOn(categoriaService, 'getCategorias').and.returnValues([{id:0, descricao: 'Teste Categoria', idUsuario: 1, idTipoCategoria: 1}]);
   //const spyOnGetCategoriaById = spyOn(categoriaService, 'getCategoriaById').and.returnValue(1);
    //const spyOnDeleteCategoria = spyOn(categoriaService, 'deleteCategoria').and.returnValue(1);

    // Act
    component.ngOnInit();
    component.initializeDataTable();
    component.onEdit(1);
    //component.onDelete(1);
    mockcategoriasData = component.getCategoriasData();

    // Assert
    expect(component).toBeTruthy();
    expect(mockAuthService).not.toBeNull();
  });
});
