import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';

@Injectable({
  providedIn: 'root'
})

export class SaldoService {

  constructor(public httpClient: HttpClient) { }

  getSaldo(): any {
    return this.httpClient.get(`Saldo`);
  }

  getSaldoAnual(ano: Dayjs): any {
    return this.httpClient.get(`Saldo/ByAno/${ano}`);
  }

  getSaldoByMesANo(mesAno: Dayjs): any {
    return this.httpClient.get(`Saldo/ByMesAno/${mesAno}`);
  }
}
