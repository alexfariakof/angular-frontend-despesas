import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeiroAcessoComponent } from './primeiro-acesso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAlertComponent } from 'src/app/__mock__/mock-component/mock-alert.component';
import { SuccessAlertComponent } from 'src/app/shared/components/success-alert/success-alert.component';

describe('PrimeiroAcessoComponent', () => {
  let component: PrimeiroAcessoComponent;
  let fixture: ComponentFixture<PrimeiroAcessoComponent>;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeiroAcessoComponent],
      imports: [ReactiveFormsModule, NgbModalModule,  RouterTestingModule],
      providers: [NgbModalConfig,  { provide: NgbModal, useValue: jasmine.createSpyObj('NgbModal', ['open']) },],
    });
    fixture = TestBed.createComponent(PrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('onSaveClick should open a modal with a message', () => {
    // Arrange
    const modalRef = jasmine.createSpyObj('NgbModalRef', ['componentInstance', 'message']);
    const message = 'Cadastro realizado com sucesso!';
    (modalService.open as jasmine.Spy).and.returnValue(modalRef);

    // Act
    component.onSaveClick();

    // Assert
    expect(modalService.open).toHaveBeenCalled();
    expect(modalRef.componentInstance.message).toBe(message);
  });

  it('should toggle senha visibility and update eye icon class', () => {
    // Arrange
    component.ngOnInit();
    component.showSenha = false;
    component.eyeIconClass = 'bi-eye';

    // Act
    component.onToogleSenha();

    // Assert
    expect(component.showSenha).toBe(true);
    expect(component.eyeIconClass).toBe('bi-eye-slash');

    // Act
    component.onToogleSenha();

    // Assert
    expect(component.showSenha).toBe(false);
    expect(component.eyeIconClass).toBe('bi-eye');
  });

  it('should toggle confirma senha visibility and update eye icon class', () => {
    // Arrange
    component.ngOnInit();
    component.showConfirmaSenha = false;
    component.eyeIconClassConfirmaSenha = 'bi-eye';

    // Act
    component.onToogleConfirmaSenha();

    // Assert
    expect(component.showConfirmaSenha).toBe(true);
    expect(component.eyeIconClassConfirmaSenha).toBe('bi-eye-slash');

    // Act
    component.onToogleConfirmaSenha();

    // Assert
    expect(component.showConfirmaSenha).toBe(false);
    expect(component.eyeIconClassConfirmaSenha).toBe('bi-eye');
  });

});
