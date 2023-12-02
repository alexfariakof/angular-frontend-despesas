import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(public httpClient: HttpClient) {  }

  getDataGraphicByYear(ano: Dayjs, idUsuario:number) : any {
    return this.httpClient.get(`lancamento/GetDadosGraficoByAnoByIdUsuario/${ ano }/${ idUsuario }`);
  }
}
