import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { Router } from "@angular/router";
import { map, catchError } from "rxjs";
import { AlertComponent } from "src/app/shared/components/alert-component/alert.component";
import { IAuth } from "src/app/shared/interfaces/IAuth";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ControleAcessoService } from "src/app/shared/services/api/controle-acesso/controle-acesso.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  public login: ILogin = { email: 'teste@teste.com', senha: 'teste' };
  loginForm: FormGroup = this.formbuilder.group({});
  showPassword = false;
  eyeIconClass: string = 'bi-eye';

  constructor(
    private formbuilder: FormBuilder,
    public router: Router,
    public controleAcessoService: ControleAcessoService,
    public authProviderService: AuthService,
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
          return this.authProviderService.createAccessToken(response);
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
      next: (result: Boolean) => {
        if (result === true)
          this.router.navigate(['/dashboard']);
      },
      error :(response : any) =>  {
        this.modalALert.open(AlertComponent, response.message, 'Warning');
      },
      complete() {

      }
    });
  }

  onTooglePassword() {
    this.showPassword = !this.showPassword;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }
}
