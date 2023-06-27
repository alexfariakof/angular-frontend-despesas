import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ILogin } from "src/app/shared/interfaces/ILogin";

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    @Input() login: ILogin = { email: '', password: '' };  

  constructor(public formbuilder: FormBuilder, 
    private router: Router){

  }

  loginForm: FormGroup;

  ngOnInit(): void{
    this.loginForm = this.formbuilder.group({
        txtLogin: ['', [Validators.required, Validators.email]],
        txtPassword: ['', Validators.required]
    })
    
        
  }

  getLoginDados(){
    return this, this.loginForm.controls;
  }

  onLoginClick() {
    alert('email: ' + this.login.email + ' -' + 'password: ' + this.login.password );    
  }
}