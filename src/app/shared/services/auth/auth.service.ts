import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuth } from '../../interfaces/IAuth';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accessTokenSubject = new BehaviorSubject<string | undefined>(undefined);

  accessToken$ = this.accessTokenSubject.asObservable();

  constructor() {
    try {
      const accessToken = localStorage.getItem('@token');
      if (accessToken) {
        this.setAccessToken(accessToken);
      } else {
        this.clearLocalStorage();
      }
    } catch {
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
    const accessToken = this.accessTokenSubject.getValue() || localStorage.getItem('@token');
    if (accessToken === null || accessToken === undefined) {
      this.clearLocalStorage();
      return false;
    }
    return true;
  }

  createAccessToken(auth: IAuth): Boolean {
    try {
      localStorage.setItem('@token', auth.accessToken);
      this.setAccessToken(auth.accessToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
