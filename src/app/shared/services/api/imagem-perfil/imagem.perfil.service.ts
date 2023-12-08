import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ImagemPerfilService {

  constructor(public httpClient: HttpClient) { }

  getImagemPerfilUsuario(): any {
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

  deleteImagemPerfilUsuario(): any {
    return this.httpClient.delete(`ImagemPerfilUsuario`);
  }
}
