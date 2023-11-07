import { Component, EventEmitter, Input, Output,  } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule  } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, of, switchMap } from "rxjs";
import { WarningAlertComponent } from "src/app/shared/components/warning-alert/warning-alert.component";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { IAuth } from "src/app/shared/interfaces/IAuth";
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
    private loginService: LoginService,
    private modalService: NgbModal ){

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
    let response;
    this.loginService.login({ email, senha }).pipe(
      switchMap(token => {
        return of(token);
      }),
      catchError(err => {
        const modalRef = this.modalService.open(WarningAlertComponent);
        modalRef.componentInstance.message = err.message;
        return err;
      })
    ).subscribe((token: any) => {
      if (token.authenticated){
        this.router.navigate(['/dashboard']);
      }
      else{
        const modalRef = this.modalService.open(WarningAlertComponent);
        modalRef.componentInstance.message = token.message;

      }
    });
  }

  onTooglePassword() {
    this.showPassword = !this.showPassword;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

}
function token(value: unknown): void {
  throw new Error("Function not implemented.");
}

function onTooglePassword() {
  throw new Error("Function not implemented.");
}

