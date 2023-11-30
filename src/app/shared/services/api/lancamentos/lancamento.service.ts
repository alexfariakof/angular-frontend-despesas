import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';

@Injectable({
  providedIn: 'root'
})

export class LancamentoService {

  constructor(public httpClient: HttpClient) {  }

  getLancamentosByMesAnoIdUsuario(mesAno: Dayjs, idUsuario:number) : any {
    return this.httpClient.get(`lancamento/${ mesAno }/${ idUsuario }`);
  }
}
