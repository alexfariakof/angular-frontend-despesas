import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterMesAnoService {
  private _dataMesAno: BehaviorSubject<string> = new BehaviorSubject<string>(dayjs().format('YYYY-MM'));
  dataMesAno$ = this._dataMesAno.asObservable();

  get dataMesAno(): string { return this._dataMesAno.getValue(); }
  set dataMesAno(value: string) {
    this._dataMesAno.next(value);
  }
}
