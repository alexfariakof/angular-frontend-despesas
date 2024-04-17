import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterAnoService {
  private _dataAno: BehaviorSubject<string>;

  constructor() {
    const storedYear = sessionStorage.getItem('selectedYear');
    const initialYear = storedYear || dayjs().format('YYYY');
    this._dataAno = new BehaviorSubject<string>(initialYear);
  }

  get dataAno$() {
    return this._dataAno.asObservable();
  }

  get dataAno(): string {
    return this._dataAno.getValue();
  }

  set dataAno(value: string) {
    this._dataAno.next(value);
    sessionStorage.setItem('selectedYear', value);
  }
}
