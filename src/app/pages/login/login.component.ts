import { Component, EventEmitter, Input, Output,  } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule  } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, of, switchMap } from "rxjs";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { LoginService } from "src/app/shared/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public login: ILogin = { email: 'teste@teste.com', senha: 'teste' };
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
    const { email, senha } = this.login;

    this.loginService.login({ email, senha }).pipe(
      switchMap(token => {
        this.router.navigate(['/dashboard']);
        return of(token);
      }),
      catchError(err => {
        console.log(new Error('Login failed'));
        return of(err);
      })
    ).subscribe();
  }

  onTooglePassword() {
    this.showPassword = !this.showPassword;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

}
