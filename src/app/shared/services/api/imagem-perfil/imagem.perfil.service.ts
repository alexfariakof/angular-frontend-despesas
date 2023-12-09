import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ImagemPerfilService {
  private endPoint: string = 'Usuario/ImagemPerfil';

  constructor(public httpClient: HttpClient) { }

  getImagemPerfilUsuario(): any {
    return this.httpClient.get(`${this.endPoint}`);
  }

  createImagemPerfilUsuario(file: File): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.endPoint}`, formData);
  }

  updateImagemPerfilUsuario(file: File): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.put(`${this.endPoint}`, formData);
  }

  deleteImagemPerfilUsuario(): any {
    return this.httpClient.delete(`${this.endPoint}`);
  }
}
