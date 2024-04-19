import { Injectable } from '@angular/core';
import { IAuth } from '../../models';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.authenticated) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    sessionStorage.removeItem(REFRESHTOKEN_KEY);
    sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: IAuth): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): IAuth {
    const user = sessionStorage.getItem(USER_KEY);
    if (user)  return JSON.parse(user);
    return {} as IAuth;
  }
}
