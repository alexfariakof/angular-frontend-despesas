import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,  RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { provide: Router, useValue: mockRouter }]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on successful login', fakeAsync(() => {
    // Arrange
    const login: ILogin = { email: "teste@teste.com", senha: "teste" };
    const authResponse = { authenticated: true };
    spyOn(component.controleAcessoService, 'signIn').and.returnValue(of(authResponse));
    spyOn(component, 'onLoginClick').and.callThrough();

    // Act
    component.login = login;
    component.onLoginClick();

    // Assert
    expect(component.controleAcessoService.signIn).toHaveBeenCalledWith(login);
    expect(component.onLoginClick).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  /*
  it('should open modal when promisse is rejected ', () => {
    // Arrange
    const errorMessage = "Error Test Component";
    spyOn(component.modalALert, 'open').and.callThrough();
    spyOn(component.controleAcessoService, 'signIn').and.rejectWith(errorMessage);
    spyOn(component, 'onLoginClick').and.callThrough();

    // Act
    component.onLoginClick();

    // Asssert
    expect(component.modalALert.open).toHaveBeenCalled();
  });
*/
  it('should open modal when authenticated is not true ', () => {
    // Arrange
    const authResponse = { authenticated: false, message: 'Test Erro Auth' };
    spyOn(component.modalALert, 'open').and.callThrough();
    spyOn(component.controleAcessoService, 'signIn').and.returnValue(of(authResponse));
    spyOn(component, 'onLoginClick').and.callThrough();

    // Act
    component.onLoginClick();

    // Asssert
    expect(component.modalALert.open).toHaveBeenCalled();
  });

/*
  it('should open a modal when thow error', () => {
    // Arrange
    const errorMessage = Error('{ error: { message : "Error Test Component"}}');
    spyOn(component.modalALert, 'open').and.callThrough();
    spyOn(component.controleAcessoService, 'signIn').and.returnValue(errorMessage).and.throwError;
    spyOn(component, 'onLoginClick').and.callThrough();

    // Act
    component.onLoginClick();

    // Assert
    expect(component.modalALert.open).toHaveBeenCalled();
  });
  */


  it('should return login form controls', () => {
    // Arrange
    component.ngOnInit();
    component.loginForm.controls['txtLogin'].setValue('teste@teste.com');
    component.loginForm.controls['txtPassword'].setValue('password');

    // Act
    const loginDados = component.getLoginDados;

    // Assert
    expect(loginDados['txtLogin'].value).toBe('teste@teste.com');
    expect(loginDados['txtPassword'].value).toBe('password');
  });

  it('should toggle password visibility and update eye icon class', () => {
    // Arrange
    component.ngOnInit();
    component.showPassword = false;
    component.eyeIconClass = 'bi-eye';

    // Act
    component.onTooglePassword();

    // Assert
    expect(component.showPassword).toBe(true);
    expect(component.eyeIconClass).toBe('bi-eye-slash');

    // Act
    component.onTooglePassword();

    // Assert
    expect(component.showPassword).toBe(false);
    expect(component.eyeIconClass).toBe('bi-eye');
  });
});
