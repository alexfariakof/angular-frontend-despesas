import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IAuth } from 'src/app/shared/interfaces/IAuth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['createAccessToken', 'isAuthenticated']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,  RouterTestingModule, HttpClientTestingModule,  ],
      providers: [AlertComponent, NgbActiveModal,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ]
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
    const authResponse: IAuth = {
      authenticated: true,
      created: '2023-10-01',
      expiration: '2023-10-30',
      accessToken: 'teste#token',
      message: 'OK',
      usuario: undefined
    };

    spyOn(component.controleAcessoService, 'signIn').and.returnValue(of(authResponse));
    spyOn(component, 'onLoginClick').and.callThrough();
    mockAuthService.createAccessToken.and.returnValue(true);
    mockAuthService.isAuthenticated.and.returnValue(true);

    // Act
    component.login = login;
    component.onLoginClick();
    component.controleAcessoService.createUsuario
    flush();

    // Assert
    expect(component.controleAcessoService.signIn).toHaveBeenCalledWith(login);
    expect(component.onLoginClick).toHaveBeenCalled();
    expect(component.authProviderService.createAccessToken).toHaveBeenCalledWith(authResponse);
    expect(component.authProviderService.isAuthenticated()).toBe(true);
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));


  it('should open modal when promisse is rejected ', () => {
    // Arrange
    const errorMessage = "Error Test Component";
    spyOn(component.modalALert, 'open').and.callThrough();
    spyOn(component.controleAcessoService, 'signIn').and.rejectWith(errorMessage).and.callThrough();
    spyOn(component, 'onLoginClick');

    // Act
    component.onLoginClick();

    // Asssert
    expect(component.onLoginClick).toHaveBeenCalled();
    expect(component.controleAcessoService.signIn).not.toHaveBeenCalled();
  });

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
