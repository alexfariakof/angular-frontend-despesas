  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { ILogin } from '../../interfaces/ILogin';
  import { environment } from '../../environments/environment';
  import { IControleAcesso } from 'src/app/shared/interfaces/IControleAcesso';

  @Injectable({
      providedIn: 'root'
  })

  export class ControleAcessoService {

    constructor(private httpClient: HttpClient) {
    }

    private readonly baseUrl = environment["endPoint"];

    signIn(login: ILogin): any {
      return this.httpClient.post<ILogin>(`${this.baseUrl}/ControleAcesso/SignIn`, login);
    }

    createUsuario(controleAcesso: IControleAcesso) : any {
      return this.httpClient.post<IControleAcesso>(`${this.baseUrl}/ControleAcesso`, controleAcesso);
    }
  }
