import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { ILogin } from '../interfaces/ILogin';
import { environment } from '../environments/environment';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a POST request to the login endpoint', inject(
    [LoginService, HttpTestingController],
    (service: LoginService, httpMock: HttpTestingController) => {
      const loginData: ILogin = {
        email: 'teste@teste.com',
        senha: 'teste',
      };

      service.login(loginData).subscribe((response) => {
        expect(response).toBeTruthy(); // Espera que seja verdadeiro que o requeste tenha sido realizado com sucesso!
      });

      const req = httpMock.expectOne(
        `${environment.endPoint}/ControleAcesso/SignIn`
      );
      expect(req.request.method).toBe('POST');
      req.flush({}); // You can provide a mock response data here

      // Add assertions for any additional checks you need
      // For example, you can check the request headers, URL, etc.

      httpMock.verify(); // Ensure that there are no outstanding requests
    }
  ));
});
