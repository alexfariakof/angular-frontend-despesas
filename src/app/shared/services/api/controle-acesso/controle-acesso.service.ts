  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { ILogin } from '../../../interfaces/ILogin';
  import { IControleAcesso } from 'src/app/shared/interfaces/IControleAcesso';

  @Injectable({
      providedIn: 'root'
  })

  export class ControleAcessoService {

   constructor(private httpClient: HttpClient) { }


    signIn(login: ILogin): any {
      return this.httpClient.post<ILogin>(`ControleAcesso/SignIn`, login);
    }

    createUsuario(controleAcesso: IControleAcesso) : any {
      return this.httpClient.post<IControleAcesso>(`ControleAcesso`, controleAcesso);
    }

    changePassword(login: ILogin): any {
      return this.httpClient.post<ILogin>(`ControleAcesso/ChangePassword`, login);
    }
  }
