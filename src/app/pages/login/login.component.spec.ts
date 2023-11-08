import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningAlertComponent } from 'src/app/shared/components/warning-alert/warning-alert.component';
import { LayoutRoutingModule } from 'src/app/shared/components/layout/layout-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SuccessAlertComponent } from 'src/app/shared/components/success-alert/success-alert.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;
  let modalService: NgbModal;


  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, LayoutRoutingModule, RouterTestingModule ],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: NgbModal, useValue: jasmine.createSpyObj('NgbModal', ['open']) },
        { provide: LoginService, useValue: loginServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    modalService = TestBed.inject(NgbModal);
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to dashboard on successful login', () => {
    const login : ILogin = { email: 'teste@test.com', senha: 'teste' };
    (loginService.login as jasmine.Spy).and.returnValue(of({ authenticated: true }));

    component.login = login;
    component.onLoginClick();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should open a modal with a message', () => {
    const modalRef = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const message = 'Test message';

    (modalService.open as jasmine.Spy).and.returnValue(modalRef);

    component.showMessage(message);

    expect(modalService.open).toHaveBeenCalledWith(WarningAlertComponent);
    expect(modalRef.componentInstance.message).toBe(message);
  });

  it('should return login form controls', () => {
    component.ngOnInit();
    component.loginForm.controls['txtLogin'].setValue('teste@teste.com');
    component.loginForm.controls['txtPassword'].setValue('password');

    const loginDados = component.getLoginDados;
    expect(loginDados['txtLogin'].value).toBe('teste@teste.com');
    expect(loginDados['txtPassword'].value).toBe('password');
  });

  it('should toggle password visibility and update eye icon class', () => {
    component.ngOnInit();

    component.showPassword = false;
    component.eyeIconClass = 'bi-eye';
    component.onTooglePassword();

    expect(component.showPassword).toBe(true);
    expect(component.eyeIconClass).toBe('bi-eye-slash');

    component.onTooglePassword();
    expect(component.showPassword).toBe(false);
    expect(component.eyeIconClass).toBe('bi-eye');
  });
});
