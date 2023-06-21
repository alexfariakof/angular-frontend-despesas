import { Component, EventEmitter, Output } from "@angular/core";
import { ILogin } from "src/app/shared/interfaces/ILogin";
@Component({
    selector:'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})



export class LoginComponent{
    login:ILogin = {email:'', password:''};
    @Output() loginClicked: EventEmitter<void> = new EventEmitter<void>();

    onLoginClick() {
        this.loginClicked.emit();
      }
  
}