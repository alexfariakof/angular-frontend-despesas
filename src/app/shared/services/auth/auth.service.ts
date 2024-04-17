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
      const accessToken = sessionStorage.getItem('@token');
      if (accessToken) {
        this.setAccessToken(accessToken);
      } else {
        this.clearSessionStorage();
      }
    } catch {
      this.clearSessionStorage();
    }
  }

  public clearSessionStorage() {
    this.setAccessToken(undefined);
    sessionStorage.clear();
  }

  private setAccessToken(token: string | undefined) {
    this.accessTokenSubject.next(token);
  }

  isAuthenticated(): boolean {
    const accessToken = this.accessTokenSubject.getValue() || sessionStorage.getItem('@token');
    if (accessToken === null || accessToken === undefined) {
      this.clearSessionStorage();
      return false;
    }
    return true;
  }

  createAccessToken(auth: IAuth): Boolean {
    try {
      sessionStorage.setItem('@token', auth.accessToken);
      this.setAccessToken(auth.accessToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
