import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DespesaService } from './despesa.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from '../../interceptors/http.interceptor.service';
import { environment } from 'src/app/shared/environments/environment';
import { IDespesa } from 'src/app/shared/interfaces/IDespesa';
import * as dayjs from 'dayjs';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';

describe('Unit Test DespesaService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[DespesaService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
      ]
    });
  });

  it('should be created', inject([DespesaService], (service: DespesaService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a getDespesas request to the Despesa endpoint', inject(
    [DespesaService, HttpTestingController],
    (service: DespesaService, httpMock: HttpTestingController) => {

      const mockResponse : IDespesa[] = [
        { id: 1, idCategoria: 1, data: dayjs(), descricao: 'Teste Despesas 1', valor: 1.05, dataVencimento: dayjs(), categoria: null },
        { id: 2, idCategoria: 2, data: dayjs(), descricao: 'Teste Despesas 2', valor: 2.05, dataVencimento: dayjs(), categoria: null },
        { id: 3, idCategoria: 4, data: dayjs(), descricao: 'Teste Despesas 3', valor: 3.05, dataVencimento: dayjs(), categoria: null },
      ];

      service.getDespesas().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Despesa`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a getDespesaById request to the Despesa endpoint', inject(
    [DespesaService, HttpTestingController],
    (service: DespesaService, httpMock: HttpTestingController) => {

      const idDespesa = 1;
      const mockResponse: IDespesa = {
        id: 1,
        idCategoria: 1,
        data: dayjs(),
        descricao: 'Teste Despesas 1',
        valor: 1.05,
        dataVencimento: dayjs(),
        categoria: ''
      };

      service.getDespesaById(1).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Despesa/GetById/${idDespesa}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a getCategorias request to the Categoria endpoint', inject(
    [DespesaService, HttpTestingController],
    (service: DespesaService, httpMock: HttpTestingController) => {

      const mockResponse : ICategoria[] = [
        {
          id: 1,
          descricao: "Teste categoria despesa",
          idTipoCategoria: 1
        },
        {
          id: 2,
          descricao: "Teste categoria receita",
          idTipoCategoria: 2
        }
      ];

      service.getDespesasCategorias().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Categoria/GetByTipoCategoria/1`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a postDespesa request to the Despesa endpoint', inject(
    [DespesaService, HttpTestingController],
    (service: DespesaService, httpMock: HttpTestingController) => {
      const despesa : IDespesa = {
        id: 1,
        idCategoria: 2,
        data: dayjs(),
        descricao: 'Teste Despesas 1',
        valor: 1.05,
        dataVencimento: null,
        categoria: ''
      };

      const mockResponse = { message: true, Despesa: despesa  };
      service.postDespesa(despesa).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Despesa`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a putDespesa request to the Despesa endpoint', inject(
    [DespesaService, HttpTestingController],
    (service: DespesaService, httpMock: HttpTestingController) => {
      const despesa : IDespesa = {
        id: 1,
        idCategoria: 2,
        data: dayjs(),
        descricao: 'Teste Despesas 1',
        valor: 1.05,
        dataVencimento: null,
        categoria: ''
      };

      const mockResponse = { message: true, Despesa: despesa  };
      service.putDespesa(despesa).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Despesa`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('PUT');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));

  it('should send a deleteDespesa request to the Despesa endpoint', inject(
    [DespesaService, HttpTestingController],
    (service: DespesaService, httpMock: HttpTestingController) => {
      const mockResponse = true;
      const mockIdDespesa = 200;

      service.deleteDespesa(mockIdDespesa).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const expectedUrl = `${environment.endPoint}/Despesa/${ mockIdDespesa }`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('DELETE');

      req.flush(mockResponse);
      httpMock.verify();
    }
  ));


});
