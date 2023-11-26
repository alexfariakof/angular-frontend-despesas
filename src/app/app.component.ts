import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})

export class AppComponent  implements OnInit {

  constructor(private authProviderService: AuthService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,

    ) {}

  ngOnInit(): void {
    //$.fn.dataTable.ext.errMode = 'throw';
  }
}
