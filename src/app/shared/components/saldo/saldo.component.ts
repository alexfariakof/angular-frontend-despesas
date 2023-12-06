import { FilterMesService } from './../../services/utils/filter-mes.service/filter.mes.service';
import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../../services/api';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Dayjs } from 'dayjs';
dayjs.locale('pt-br');
@Component({
  selector: 'app-saldo',
  standalone: true,
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  saldoAnual: number | string;
  saldoMensal: number | string;

  constructor(private saldoService: SaldoService, public filterMesService: FilterMesService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = (): void => {
    this.saldoService.getSaldoAnual(dayjs(dayjs().format('YYYY-01-01')))
      .subscribe({
        next: (response: any) => {
          if (response.message === true && response.saldo !== undefined && response.saldo !== null) {
            this.saldoAnual = response.saldo.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
        },
        error: () => {
          this.saldoAnual = 0;
        }
      });

    this.handleSaldoMesAno(this.filterMesService.dayJs);
  }

  handleSaldoMesAno = (mes: Dayjs): void => {
    this.saldoService.getSaldoByMesANo(mes)
      .subscribe({
        next: (response: any) => {
          if (response.message === true && response.saldo !== undefined && response.saldo !== null) {
            this.saldoMensal = response.saldo.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
        },
        error: () => {
          this.saldoMensal = 0;
        }
      });
  }

  handleSelectMes = (mes: string): void => {
    this.filterMesService.selectMonth = Number(mes);
    this.handleSaldoMesAno(dayjs(dayjs().format(`YYYY-${mes}-01`)));

  }
}
