import { Component, EventEmitter, Input, Output,  } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule  } from "@angular/forms";
import { Router } from "@angular/router";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { LoginService } from "src/app/shared/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public login: ILogin = { email: '', senha: '' };
  loginForm: FormGroup;
  showPassword = false;
  eyeIconClass: string = 'bi-eye';

  constructor(public formbuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService ){

  }

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

  onTooglePassword() {
    this.showPassword = !this.showPassword;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

}
