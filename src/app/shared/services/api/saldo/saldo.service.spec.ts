import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "src/app/shared/environments/environment";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from '../../../interceptors/http.interceptor.service';
import * as dayjs from "dayjs";
import { SaldoService } from './saldo.service';

describe('Unit Test SaldoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SaldoService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
      ]
    });
  });
  it('should be created', inject([SaldoService], (service: SaldoService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a getSaldo request to the Saldo endpoint', inject(
    [SaldoService, HttpTestingController],
    (service: SaldoService, httpMock: HttpTestingController) => {

      const mockResponse: number = 989.9;

      service.getSaldo().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Saldo`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a getSaldoAnual request to the Saldo endpoint', inject(
    [SaldoService, HttpTestingController],
    (service: SaldoService, httpMock: HttpTestingController) => {

      const mockResponse: number = 2500.25;
      const mockAno = dayjs();
      service.getSaldoAnual(mockAno).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Saldo/ByAno/${mockAno}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a getSaldo request to the Saldo endpoint', inject(
    [SaldoService, HttpTestingController],
    (service: SaldoService, httpMock: HttpTestingController) => {

      const mockResponse: number = 84980.09;
      const mockMesAno = dayjs();

      service.getSaldoByMesANo(mockMesAno).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Saldo/ByMesAno/${mockMesAno}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

});
