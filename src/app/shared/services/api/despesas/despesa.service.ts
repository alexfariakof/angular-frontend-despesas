import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDespesa } from '../../../interfaces/IDespesa';
@Injectable({
  providedIn: 'root'
})

export class DespesaService {

  constructor(public httpClient: HttpClient) {  }

  getDespesas() : any {
    return this.httpClient.get(`Despesa`);
  }

  getDespesaById(idDespesa: Number) : any {
    return this.httpClient.get(`Despesa/GetById/${idDespesa}`);
  }

  getCategorias(idUsuario: number): any {
    return this.httpClient.get(`Categoria/GetByTipoCategoria/${idUsuario}/1`);
  }

  getDespesaByIdUsuario(idUsuario: Number) : any {
    return this.httpClient.get(`Despesa/GetByIdUsuario/${idUsuario}`);
  }

  postDespesa(despesa: IDespesa): any {
    return this.httpClient.post<IDespesa>(`Despesa`, despesa);
  }

  putDespesa(despesa: IDespesa): any {
    return this.httpClient.put<IDespesa>(`Despesa`, despesa);
  }

  deleteDespesa(idDespesa: Number): any {
    return this.httpClient.delete(`Despesa/${idDespesa}`);
  }
}
