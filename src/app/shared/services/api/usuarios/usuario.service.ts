import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(public httpClient: HttpClient) { }

  getUsuarios(idUsuario: number): any {
    return this.httpClient.get(`Usuario/${idUsuario}`);
  }

  getUsuario(): any {
    return this.httpClient.get(`Usuario/GetUsuario`);
  }

  postUsuario(usuario: IUsuario): any {
    return this.httpClient.post<IUsuario>(`Usuario`, usuario);
  }

  putUsuario(usuario: IUsuario): any {
    return this.httpClient.put<IUsuario>(`Usuario`, usuario);
  }

  deleteUsuario(usuario: IUsuario, idUsuario: number): any {
    return this.httpClient.delete<IUsuario>(`Usuario/${idUsuario}`, { body: usuario });
  }
}
