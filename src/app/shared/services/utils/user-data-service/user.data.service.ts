import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  getIdUsuario(): number {
    return Number(localStorage.getItem('idUsuario'));
  }
}
