import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/ILogin';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) {
    }

    private readonly baseUrl = environment["endPoint"];

    login(login: ILogin) {
        return this.httpClient.post<ILogin>(`${this.baseUrl}/ControleAcesso/SignIn`, login);
    }

}
