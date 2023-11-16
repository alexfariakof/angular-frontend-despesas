import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent  implements OnInit {
  title = 'despesas-frontend-angular';
  isAuthenticated:Boolean = false;
  message:string= '';

  constructor(private authProviderService: AuthService) {}

  ngOnInit(): void {
    $.fn.dataTable.ext.errMode = 'throw';
  }
}
