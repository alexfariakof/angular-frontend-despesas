import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDespesa } from '../../../interfaces/IDespesa';
@Injectable({
  providedIn: 'root'
})

export class DespesaService {

  constructor(public httpClient: HttpClient) { }

  getDespesas(): any {
    return this.httpClient.get(`Despesa`);
  }

  getDespesaById(idDespesa: number): any {
    return this.httpClient.get(`Despesa/GetById/${idDespesa}`);
  }

  getDespesasCategorias(): any {
    return this.httpClient.get(`Categoria/GetByTipoCategoria/1`);
  }

  postDespesa(despesa: IDespesa): any {
    return this.httpClient.post<IDespesa>(`Despesa`, despesa);
  }

  putDespesa(despesa: IDespesa): any {
    return this.httpClient.put<IDespesa>(`Despesa`, despesa);
  }

  deleteDespesa(idDespesa: number): any {
    return this.httpClient.delete(`Despesa/${idDespesa}`);
  }
}
