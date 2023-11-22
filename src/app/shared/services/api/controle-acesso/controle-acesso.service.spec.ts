import { TestBed, inject } from '@angular/core/testing';
import { ControleAcessoService } from './controle-acesso.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ILogin } from '../../../interfaces/ILogin';
import { environment } from '../../../environments/environment';
import { IControleAcesso } from '../../../interfaces/IControleAcesso';
import { CustomInterceptor } from '../../interceptors/http.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('Unit Test ControleAcessoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ControleAcessoService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
      ]
    });
  });

  it('should be created', inject([ControleAcessoService], (service: ControleAcessoService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a POST request to the ControleAcesso/SignIn endpoint', inject(
    [ControleAcessoService, HttpTestingController],
    (service: ControleAcessoService, httpMock: HttpTestingController) => {
      const loginData: ILogin = {
        email: 'teste@teste.com',
        senha: 'teste',
      };

      const mockResponse = { message: true };

      // Call the service method inside a subscribe to ensure the request is made
      service.signIn(loginData).subscribe((response: any) => {
        // Expect that the response is a truthy value
        expect(response).toBeTruthy();
      });

      // Define the expected URL for the POST request
      const expectedUrl = `${environment.endPoint}/ControleAcesso/SignIn`;

      // Expect a single request to the specified URL
      const req = httpMock.expectOne(expectedUrl);

      // Verify that the request method is POST
      expect(req.request.method).toBe('POST');

      // Respond to the request with the mock response data
      req.flush(mockResponse);

      // Verify that there are no outstanding requests
      httpMock.verify();
    }
  ));

  it('should send a POST request to the /ControleAcesso endpoint', inject(
    [ControleAcessoService, HttpTestingController],
    (service: ControleAcessoService, httpMock: HttpTestingController) => {
      const controleAcessoData: IControleAcesso = {
        nome: 'Teste ',
        sobreNome: 'Usuario',
        telefone: '(21) 9999-9999',
        email: 'teste@teste.com',
        senha: '12345',
        confirmaSenha: '12345'
      };

      const mockResponse = { message: true };

      // Call the service method inside a subscribe to ensure the request is made
      service.createUsuario(controleAcessoData).subscribe((response: any) => {
        // Expect that the response is a truthy value
        expect(response).toBeTruthy();
      });

      // Define the expected URL for the POST request
      const expectedUrl = `${environment.endPoint}/ControleAcesso`;

      // Expect a single request to the specified URL
      const req = httpMock.expectOne(expectedUrl);

      // Verify that the request method is POST
      expect(req.request.method).toBe('POST');

      // Respond to the request with the mock response data
      req.flush(mockResponse);

      // Verify that there are no outstanding requests
      httpMock.verify();
    }
  ));

});
