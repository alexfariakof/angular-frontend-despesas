import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'despesas-frontend-angular';
  isAuthenticated:Boolean = false;
  message:string= '';

  ngOnInit(): void {
    $.fn.dataTable.ext.errMode = 'throw';
  }

  onLoginClicked() {
    this.isAuthenticated = true;
  }
}
