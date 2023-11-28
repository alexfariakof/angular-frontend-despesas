import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReceita } from '../../../interfaces/IReceita';
@Injectable({
  providedIn: 'root'
})

export class ReceitaService {

  constructor(public httpClient: HttpClient) {  }

  getReceitas() : any {
    return this.httpClient.get(`Receita`);
  }

  getReceitaById(idReceita: Number) : any {
    return this.httpClient.get(`Receita/GetById/${idReceita}`);
  }

  getCategorias(idUsuario: number): any {
    return this.httpClient.get(`Categoria/GetByTipoCategoria/${idUsuario}/1`);
  }

  getReceitaByIdUsuario(idUsuario: Number) : any {
    return this.httpClient.get(`Receita/GetByIdUsuario/${idUsuario}`);
  }

  postReceita(despesa: IReceita): any {
    return this.httpClient.post<IReceita>(`Receita`, despesa);
  }

  putReceita(despesa: IReceita): any {
    return this.httpClient.put<IReceita>(`Receita`, despesa);
  }

  deleteReceita(idReceita: Number): any {
    return this.httpClient.delete(`Receita/${idReceita}`);
  }
}