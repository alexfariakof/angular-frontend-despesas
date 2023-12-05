import { TestBed, inject } from "@angular/core/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "src/app/shared/environments/environment";
import { IUsuario } from "src/app/shared/interfaces";
import { CustomInterceptor } from "../../interceptors/http.interceptor.service";
import { UsuarioService } from "./usuario.service";

describe('Unit Test UsuarioService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[UsuarioService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
      ]
    });
  });

  it('should be created', inject([UsuarioService], (service: UsuarioService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a getUsuarios request to the Usuario endpoint', inject(
    [UsuarioService, HttpTestingController],
    (service: UsuarioService, httpMock: HttpTestingController) => {

      const mockResponse : IUsuario[] = [
        {
          id: 1,
          email: 'teste@teste.com',
          nome: 'Teste Usaurio',
          sobreNome: 'Teste',
          telefone: '(21) 9999-9999'
        },
        {
          id: 2,
          email: 'teste2@teste.com',
          nome: 'Teste Usaurio 2',
          sobreNome: 'Teste',
          telefone: '(21) 9999-9999'
        }
      ];

      service.getUsuarios(1).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Usuario/1`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a getUsuarioById request to the Usuario endpoint', inject(
    [UsuarioService, HttpTestingController],
    (service: UsuarioService, httpMock: HttpTestingController) => {

      const idUsuario = 1;
      const mockResponse: IUsuario = {
        id: 2,
        email: 'teste@teste.com',
        nome: 'Teste Usaurio',
        sobreNome: 'Teste',
        telefone: '(21) 9999-9999'
      };

      service.getUsuarioById(idUsuario).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Usuario/GetById/${idUsuario}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a postUsuario request to the Usuario endpoint', inject(
    [UsuarioService, HttpTestingController],
    (service: UsuarioService, httpMock: HttpTestingController) => {
      const usuario : IUsuario = {
        id: 1,
        email: 'teste@teste.com',
        nome: 'Teste Usaurio',
        sobreNome: 'Teste',
        telefone: '(21) 9999-9999'
      };

      const mockResponse = { message: true, Usuario: usuario  };
      service.postUsuario(usuario).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Usuario`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a putUsuario request to the Usuario endpoint', inject(
    [UsuarioService, HttpTestingController],
    (service: UsuarioService, httpMock: HttpTestingController) => {
      const usuario : IUsuario = {
        id: 1,
        email: 'teste@teste.com',
        nome: 'Teste Usaurio',
        sobreNome: 'Teste',
        telefone: '(21) 9999-9999'

      };

      const mockResponse = { message: true, Usuario: usuario  };
      service.putUsuario(usuario).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Usuario`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('PUT');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a deleteUsuario request to the Usuario endpoint', inject(
    [UsuarioService, HttpTestingController],
    (service: UsuarioService, httpMock: HttpTestingController) => {
      const usuario : IUsuario = {
        id : 4,
        email: 'teste@teste.com',
        nome: 'Teste Usaurio',
        sobreNome: 'Teste',
        telefone: '(21) 9999-9999'
      };


      const idUsuario = 1;
      const mockResponse = true;

      service.deleteUsuario(usuario, idUsuario).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Usuario/${idUsuario}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('DELETE');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));
});