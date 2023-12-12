import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IAuth } from '../../interfaces/IAuth';
import { AuthService } from './auth.service';

describe('Unit Test AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[AuthService]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    // Assert
    expect(service).toBeTruthy();
  }));

  it('should set and get access token', () => {
    // Arrange
    const fakeAuth: IAuth = {
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
    expect(localStorage.getItem('@token')).toBe('fakeToken');
  });

  it('should clear local storage', () => {
    // Act
    authService.clearLocalStorage();

    // Assert
    expect(authService.isAuthenticated()).toBeFalsy();
    expect(localStorage.getItem('@token')).toBeNull();
  });

  it('should catch error on creating access token', () => {
    // Arrange
    spyOn(localStorage, 'setItem').and.throwError('Fake error');

    const fakeAuth: IAuth = {
      accessToken: undefined,
      expiration: '2023-01-01T00:00:00Z',
      authenticated: false,
      created: '',
      message: ''
    };

    // Act
    const result = authService.createAccessToken(fakeAuth);

    // Assert
    expect(result).toBeFalsy();
  });
});

