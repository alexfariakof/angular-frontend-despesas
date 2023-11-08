import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeiroAcessoComponent } from './primeiro-acesso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrimeiroAcessoComponent', () => {
  let component: PrimeiroAcessoComponent;
  let fixture: ComponentFixture<PrimeiroAcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeiroAcessoComponent],
      imports: [ReactiveFormsModule, NgbModalModule,  RouterTestingModule],
    });
    fixture = TestBed.createComponent(PrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle senha visibility and update eye icon class', () => {
    component.ngOnInit();

    component.showSenha = false;
    component.eyeIconClass = 'bi-eye';
    component.onToogleSenha();

    expect(component.showSenha).toBe(true);
    expect(component.eyeIconClass).toBe('bi-eye-slash');

    component.onToogleSenha();
    expect(component.showSenha).toBe(false);
    expect(component.eyeIconClass).toBe('bi-eye');
  });

  it('should toggle confirma senha visibility and update eye icon class', () => {
    component.ngOnInit();

    component.showConfirmaSenha = false;
    component.eyeIconClassConfirmaSenha = 'bi-eye';
    component.onToogleConfirmaSenha();

    expect(component.showConfirmaSenha).toBe(true);
    expect(component.eyeIconClassConfirmaSenha).toBe('bi-eye-slash');

    component.onToogleConfirmaSenha();
    expect(component.showConfirmaSenha).toBe(false);
    expect(component.eyeIconClassConfirmaSenha).toBe('bi-eye');
  });

});
