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

  getDespesaById(idCategoria: Number) : any {
    return this.httpClient.get(`Despesa/GetById/${idCategoria}`);
  }

  getDespesaByIdUsuario(idUsuario: Number) : any {
    return this.httpClient.get(`Despesa/GetByIdUsuario/${idUsuario}`);
  }

  postDespesa(categoria: IDespesa): any {
    return this.httpClient.post<IDespesa>(`Despesa`, categoria);
  }

  putEespesa(categoria: IDespesa): any {
    return this.httpClient.put<IDespesa>(`Despesa`, categoria);
  }

  deleteDespesa(idCategoria: Number): any {
    return this.httpClient.delete(`Despesa/${idCategoria}`);
  }
}
