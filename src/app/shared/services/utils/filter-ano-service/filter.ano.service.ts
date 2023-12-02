import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterAnoService {
  private _dataAno: BehaviorSubject<string> = new BehaviorSubject<string>(dayjs().format('YYYY'));
  dataAno$ = this._dataAno.asObservable();

  get dataAno(): string { return this._dataAno.getValue(); }
  set dataAno(value: string) {
    this._dataAno.next(value);
  }
}
