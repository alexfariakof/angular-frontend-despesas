import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoria } from './../../../interfaces/ICategoria';
@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  constructor(public httpClient: HttpClient) {  }

  getCategorias() : any {
    return this.httpClient.get(`Categoria`);
  }

  getCategoriaById(idCategoria: Number) : any {
    return this.httpClient.get(`Categoria/GetById/${idCategoria}`);
  }

  postCategoria(categoria: ICategoria): any {
    return this.httpClient.post<ICategoria>(`Categoria`, categoria);
  }

  putCategoria(categoria: ICategoria): any {
    return this.httpClient.put<ICategoria>(`Categoria`, categoria);
  }

  deleteCategoria(idCategoria: Number): any {
    return this.httpClient.delete(`Categoria/${idCategoria}`);
  }
}
