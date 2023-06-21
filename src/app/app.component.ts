import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {  
  title = 'despesas-frontend-angular';
  isAuthenticated:Boolean = false;

  onLoginClicked() {
    this.isAuthenticated = true;
  }
}
