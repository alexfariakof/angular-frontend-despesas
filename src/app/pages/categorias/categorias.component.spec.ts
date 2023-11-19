import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
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
    spyOn(component, 'getCategoriasData').and.returnValue(null);
    fixture.detectChanges();
  });

  it('should create', () => {

    // Assert
    expect(component).toBeTruthy();
  });
});
