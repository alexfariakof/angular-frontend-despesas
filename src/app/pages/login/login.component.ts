import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { Router } from "@angular/router";
import { map, catchError } from "rxjs";
import { AlertComponent } from "src/app/shared/components/alert-component/alert.component";
import { IAuth } from "src/app/shared/interfaces/IAuth";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { ControleAcessoService } from "src/app/shared/services/controle-acesso/controle-acesso.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ControleAcessoService, AlertComponent]
})

export class LoginComponent implements OnInit{
  public login: ILogin = { email: 'teste@teste.com', senha: 'teste' };
  loginForm: FormGroup;
  showPassword = false;
  eyeIconClass: string = 'bi-eye';

  constructor(private formbuilder: FormBuilder,
    public router: Router,
    public controleAcessoService: ControleAcessoService,
    public modalALert: AlertComponent ){

  }

  ngOnInit(): void{
    this.loginForm = this.formbuilder.group({
        txtLogin: ['', [Validators.required, Validators.email]],
        txtPassword: ['', Validators.required]
    });
  }

  get getLoginDados(){
    return this, this.loginForm.controls;
  }

  onLoginClick() {
    this.controleAcessoService.signIn(this.login).pipe(
      map((response: IAuth | any) => {
        if (response.authenticated) {
          return response.authenticated;
        }
        else {
          throw (response);
        }
      }),
      catchError((error) => {
        throw (error);
      })
    )
    .subscribe({
      next: (result) => {
        if (result)
          this.router.navigate(['/dashboard']);
      },
      error: (response) => this.modalALert.open(AlertComponent, response.message, 'Warning'),
      complete() {

      }
    });
  }

  onTooglePassword() {
    this.showPassword = !this.showPassword;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }
}
