import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { WarningAlertComponent } from "src/app/shared/components/warning-alert/warning-alert.component";
import { IAuth } from "src/app/shared/interfaces/IAuth";
import { ILogin } from "src/app/shared/interfaces/ILogin";
import { LoginService } from "src/app/shared/services/login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  public login: ILogin = { email: 'teste@teste.com', senha: 'teste' };
  loginForm: FormGroup;
  showPassword = false;
  eyeIconClass: string = 'bi-eye';
  public modalRef: NgbModalRef;

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

    this.loginService.login(this.login).subscribe((response: IAuth | any) => {
      try{
        if (response.authenticated){
          this.router.navigate(['/dashboard']);
        }
        else {
          this.showMessage(response.message);
        }

      }
      catch (error) {
        this.showMessage(error.message)
      }
    });
  }

  onTooglePassword() {
    this.showPassword = !this.showPassword;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

  showMessage(message:string){
    this.modalRef = this.modalService.open(WarningAlertComponent);
    this.modalRef.componentInstance.message = message;

  }
}
