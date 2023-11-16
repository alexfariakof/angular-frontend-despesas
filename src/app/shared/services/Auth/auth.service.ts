import { ControleAcessoService } from 'src/app/shared/services/controle-acesso/controle-acesso.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuth } from '../../interfaces/IAuth';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private accessTokenSubject = new BehaviorSubject<string | undefined>(undefined);

  accessToken$ = this.accessTokenSubject.asObservable();

  constructor(private authService: ControleAcessoService) {
    const accessToken = localStorage.getItem('@dpApiAccess');

    try {
      if (accessToken) {
        this.setAccessToken(JSON.parse(accessToken));
      } else {
        this.clearLocalStorage();
      }
    } catch {
      this.clearLocalStorage();
    }
  }

  private clearLocalStorage() {
    this.setAccessToken(undefined);
    localStorage.clear();
  }

  private setAccessToken(token: string | undefined) {
    this.accessTokenSubject.next(token);
  }

  isAuthenticated(): boolean {
    const accessToken = this.accessTokenSubject.getValue();
    return !!accessToken; // Check if accessToken is truthy
  }

  createAccessToken(auth: IAuth): Boolean {
    try {
      localStorage.setItem('idUsuario', auth.usuario.id);
      localStorage.setItem('@dpApiAccess', JSON.stringify(auth.accessToken));
      localStorage.setItem('@expiration', auth.expiration);
      this.setAccessToken(auth.accessToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
