import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '..';
import { IAuth } from '../../models';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accessTokenSubject = new BehaviorSubject<string | undefined>(undefined);

  accessToken$ = this.accessTokenSubject.asObservable();

  constructor(private tokenStorage: TokenStorageService) {
    try {
      const accessToken = this.tokenStorage.getToken();
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
    const accessToken = this.tokenStorage.getToken() ?? this.accessTokenSubject.getValue();
    if (accessToken === null || accessToken === undefined) {
      this.clearSessionStorage();
      return false;
    }
    return true;
  }

  createAccessToken(auth: IAuth): Boolean {
    try {
      this.tokenStorage.saveToken(auth.accessToken);
      this.tokenStorage.saveRefreshToken(auth.refreshToken);
      this.tokenStorage.saveUser(auth);
      this.setAccessToken(auth.accessToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
