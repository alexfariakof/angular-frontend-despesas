import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IAuth } from '../../interfaces/IAuth';
import { AuthService } from './auth.service';

describe('Unit Test AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[AuthService ]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    // Assert
    expect(service).toBeTruthy();
  }));

  it('should clear local storage on error', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.throwError('Fake Error');

    // Act
    authService = new AuthService();

    // Assert
    expect(authService.isAuthenticated()).toBeFalsy();
  });

  it('should set and get access token', () => {
    // Arrange
    const fakeAuth: IAuth = {
      usuario: { id: '123' },
      accessToken: 'fakeToken',
      expiration: '2023-01-01T00:00:00Z',
      authenticated: true,
      created: '2023-01-01T00:00:00Z',
      message: 'OK'
    };

    // Act
    authService.createAccessToken(fakeAuth);

    // Assert
    expect(authService.isAuthenticated()).toBe(true);
    expect(localStorage.getItem('@dpApiAccess')).toBe('fakeToken');
  });

  it('should clear local storage', () => {
    // Act
    authService.clearLocalStorage();

    // Assert
    expect(authService.isAuthenticated()).toBeFalsy();
    expect(localStorage.getItem('@dpApiAccess')).toBeNull();
  });

  it('should catch error on creating access token', () => {
    // Arrange
    spyOn(localStorage, 'setItem').and.throwError('Fake error');

    const fakeAuth: IAuth = {
      usuario: { id: '0' },
      accessToken: undefined,
      expiration: '2023-01-01T00:00:00Z',
      authenticated: false,
      created: '',
      message: ''
    };

    // ACt
    const result = authService.createAccessToken(fakeAuth);

    // Assert
    expect(result).toBeFalsy();
  });
});
