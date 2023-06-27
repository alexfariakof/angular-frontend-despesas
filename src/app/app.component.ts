import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  title = 'despesas-frontend-angular';
  isAuthenticated:Boolean = false;
  message:string= '';

  onLoginClicked() {
    this.isAuthenticated = true;
  }
}
