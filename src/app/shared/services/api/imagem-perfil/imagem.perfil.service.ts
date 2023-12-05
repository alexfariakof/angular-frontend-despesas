import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ImagemPerfilService {

  constructor(public httpClient: HttpClient) {  }

  getImagemPerfilUsuarioByIdUsuario(): any {
    return this.httpClient.get(`ImagemPerfilUsuario`);
  }

  createImagemPerfilUsuario(file: File): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`ImagemPerfilUsuario`, formData);
  }

  updateImagemPerfilUsuario(file: File): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.put(`ImagemPerfilUsuario`, formData);
  }

  deleteImagemPerfilUsuario(idUsuario: number): any {
    return this.httpClient.delete(`ImagemPerfilUsuario/${idUsuario}`);
  }
}
