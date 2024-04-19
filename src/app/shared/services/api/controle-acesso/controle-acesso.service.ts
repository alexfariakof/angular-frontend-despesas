import { Observable } from 'rxjs';
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { ILogin } from '../../../models/ILogin';
  import { IControleAcesso } from 'src/app/shared/models/IControleAcesso';
import { AbstractService } from '../base/AbstractService';
import { IAuth } from 'src/app/shared/models';
  @Injectable({
      providedIn: 'root'
  })

  export class ControleAcessoService extends AbstractService {
    constructor(private httpClient: HttpClient) {
      super();
      this.urlPath = 'ControleAcesso';
    }

    signIn(login: ILogin): any {
      return this.httpClient.post<ILogin>(`${ this.urlPath }/SignIn`, login);
    }

    createUsuario(controleAcesso: IControleAcesso) : any {
      return this.httpClient.post<IControleAcesso>(`${ this.urlPath }`, controleAcesso);
    }

    changePassword(login: ILogin): any {
      return this.httpClient.post<ILogin>(`${ this.urlPath }/ChangePassword`, login);
    }

    refreshToken(token: string): Observable<IAuth>{
      return this.httpClient.get<IAuth>(`${ this.urlPath }/refresh`);
    }

    revoke(): Observable<any> {
      return this.httpClient.get(`${ this.urlPath }/revoke`);
    }
  }
