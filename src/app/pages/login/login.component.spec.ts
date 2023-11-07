import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from 'src/app/shared/components/layout/layout-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: Router;

  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule ],
      providers: [
         { provide: LoginService, useValue: loginServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service and navigate to dashboard on login success', () => {
    const mockLoginData: ILogin = { email: 'teste@teste.com', senha: 'teste' };
    spyOn(router, 'navigate');
    loginService.login.and.returnValue(of(mockLoginData));

    component.loginForm.controls['txtLogin'].setValue('teste@teste.com');
    component.loginForm.controls['txtPassword'].setValue('teste');
    component.onLoginClick();

    expect(loginService.login).toHaveBeenCalledWith(mockLoginData);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
    const errorResponse = new Error('Login failed');
    spyOn(console, 'log'); // Espie console.log para verificar se o erro é tratado

    component.loginForm.controls['txtLogin'].setValue('teste@example.com');
    component.loginForm.controls['txtPassword'].setValue('');

    loginService.login.and.returnValue(throwError(errorResponse));

    component.onLoginClick();
    expect(loginService.login).toHaveBeenCalledWith({ email: 'teste@example.com', senha: '' });
    expect(console.log).toHaveBeenCalledWith(errorResponse);
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
