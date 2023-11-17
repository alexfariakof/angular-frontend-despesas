import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent  implements OnInit {

  constructor(private authProviderService: AuthService) {}

  ngOnInit(): void {
    $.fn.dataTable.ext.errMode = 'throw';
  }
}
