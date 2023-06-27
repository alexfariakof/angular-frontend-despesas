import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { LoginService } from "src/app/shared/services/login.service";

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  private login: ILogin = { email: '', senha: '' };  

  constructor(public formbuilder: FormBuilder, 
    private router: Router,
    private loginService: LoginService ){

  }

  loginForm: FormGroup;

  ngOnInit(): void{
    this.loginForm = this.formbuilder.group({
        txtLogin: ['', [Validators.required, Validators.email]],
        txtPassword: ['', Validators.required]
    })
    
        
  }

  get getLoginDados(){
    return this, this.loginForm.controls;
  }

  onLoginClick() {
    this.login.email = this.getLoginDados["txtLogin"].value;
    this.login.senha = this.getLoginDados["txtPassword"].value;
    this.loginService.login(this.login).subscribe(
      token => {
        alert(token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
      }

    )
  }
}