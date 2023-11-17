import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuth } from '../../interfaces/IAuth';
@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private accessTokenSubject = new BehaviorSubject<string | undefined>(undefined);

  accessToken$ = this.accessTokenSubject.asObservable();

  constructor() {
    try {
      const accessToken = localStorage.getItem('@dpApiAccess');
      if (accessToken) {
        this.setAccessToken(accessToken);
      } else {
        this.clearLocalStorage();
      }
    } catch{
      this.clearLocalStorage();
    }
  }

  public clearLocalStorage() {
    this.setAccessToken(undefined);
    localStorage.clear();
  }

  private setAccessToken(token: string | undefined) {
    this.accessTokenSubject.next(token);
  }

  isAuthenticated(): boolean {
    const accessToken = this.accessTokenSubject.getValue();
    return !!accessToken;
  }

  createAccessToken(auth: IAuth): Boolean {
    try {
      localStorage.setItem('idUsuario', auth.usuario.id);
      localStorage.setItem('@dpApiAccess', auth.accessToken);
      localStorage.setItem('@expiration', auth.expiration);
      this.setAccessToken(auth.accessToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
