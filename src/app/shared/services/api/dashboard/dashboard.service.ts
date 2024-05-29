import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';
import { AbstractService } from '../base/AbstractService';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends AbstractService {
  constructor(public httpClient: HttpClient) {
    super();
    this.urlPath = 'graficos';
  }

  getDataGraphicByYear(ano: Dayjs) : any {
    return this.httpClient.get(`${ this.urlPath }/Bar/${ ano }`);
  }
}
