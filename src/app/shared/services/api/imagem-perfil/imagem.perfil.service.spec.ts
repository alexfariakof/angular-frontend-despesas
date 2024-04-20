import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { CustomInterceptor } from '../../../interceptors/http.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImagemPerfilService } from './imagem.perfil.service';

describe('Unit Test ImagemPerfilService', () => {
  let file = new File(['Mock File Test '], 'image.png', { type: 'image/jpg' });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImagemPerfilService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
      ]
    });
  });

  it('should be created', inject([ImagemPerfilService], (service: ImagemPerfilService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a GET request to the ImagemPerfilUsuario endpoint', inject(
    [ImagemPerfilService, HttpTestingController],
    (service: ImagemPerfilService, httpMock: HttpTestingController) => {

      const mockResponse = { message: true };
      service.getImagemPerfilUsuario().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });
      const expectedUrl = `${environment.endPoint}/Usuario/ImagemPerfil`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a POST request to the ImagemPerfilUsuario endpoint', inject(
    [ImagemPerfilService, HttpTestingController],
    (service: ImagemPerfilService, httpMock: HttpTestingController) => {
      const mockResponse = { message: true };
      service.createImagemPerfilUsuario(file).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });
      const expectedUrl = `${environment.endPoint}/Usuario/ImagemPerfil`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a PUT request to the /ImagemPerfilUsuario endpoint', inject(
    [ImagemPerfilService, HttpTestingController],
    (service: ImagemPerfilService, httpMock: HttpTestingController) => {
      const mockResponse = { message: true };
      service.updateImagemPerfilUsuario(file).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });
      const expectedUrl = `${environment.endPoint}/Usuario/ImagemPerfil`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a DELETE request to the /ImagemPerfilUsuario endpoint', inject(
    [ImagemPerfilService, HttpTestingController],
    (service: ImagemPerfilService, httpMock: HttpTestingController) => {
      const mockResponse = { message: true };
      service.deleteImagemPerfilUsuario().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Usuario/ImagemPerfil`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
      httpMock.verify();
    }
  ));
});
