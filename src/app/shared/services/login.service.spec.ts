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

      const mockResponse = { message: true };

      // Call the service method inside a subscribe to ensure the request is made
      service.login(loginData).subscribe(response => {
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


});
