import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "src/app/shared/environments/environment";
import { ILancamento } from "src/app/shared/interfaces";
import { CustomInterceptor } from "../../interceptors/http.interceptor.service";
import { LancamentoService } from "./lancamento.service";
import * as dayjs from "dayjs";

describe('Unit Test LancamentoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[LancamentoService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
      ]
    });
  });

  it('should be created', inject([LancamentoService], (service: LancamentoService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a getLancamentoByMesAnoIdUsuario request to the Lancamento endpoint', inject(
    [LancamentoService, HttpTestingController],
    (service: LancamentoService, httpMock: HttpTestingController) => {

      const mockResponse : ILancamento[] = [ ];

      service.getLancamentosByMesAnoIdUsuario(dayjs(), 1).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/lancamento/${ dayjs() }/1`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

});
