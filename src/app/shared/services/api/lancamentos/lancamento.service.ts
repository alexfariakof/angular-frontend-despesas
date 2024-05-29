import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';
import { AbstractService } from '../base/AbstractService';

@Injectable({
  providedIn: 'root'
})

export class LancamentoService extends AbstractService {

  constructor(public httpClient: HttpClient) {
    super();
    this.urlPath = 'lancamento';
  }

  getLancamentosByMesAno(mesAno: Dayjs): any {
    return this.httpClient.get(`${ this.urlPath }/${mesAno}`);
  }
}
