  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';

  @Injectable({
      providedIn: 'root'
  })

  export class CategoriaService {

    constructor(public httpClient: HttpClient) {  }



    getCategorias() : any {
      return this.httpClient.get(`Categoria`);
    }
  }
