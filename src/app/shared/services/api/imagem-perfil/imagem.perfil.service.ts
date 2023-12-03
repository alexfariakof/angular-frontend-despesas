import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ImagemPerfilService {

  constructor(public httpClient: HttpClient) {  }

  getImagemPerfilUsuarioByIdUsuario(idUsuario: number): any {
    return this.httpClient.get(`ImagemPerfilUsuario/GetByIdUsuario/${idUsuario}`);
  }

  createImagemPerfilUsuario(file: File, idUsuario: number): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`ImagemPerfilUsuario?idUsuario=${idUsuario}`, formData);
  }

  updateImagemPerfilUsuario(file: File, idUsuario: number): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.put(`ImagemPerfilUsuario?idUsuario=${idUsuario}`, formData);
  }

  deleteImagemPerfilUsuario(idUsuario: number): any {
    return this.httpClient.delete(`ImagemPerfilUsuario/${idUsuario}`);
  }
}
