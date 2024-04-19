import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent, AlertType } from 'src/app/shared/components';
import { ILogin } from 'src/app/shared/models';
import { ControleAcessoService } from 'src/app/shared/services/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordFrom: FormGroup & ILogin;
  eyeIconClass: string = 'bi-eye';
  eyeIconClassConfirmaSenha: string = 'bi-eye';
  showSenha = false;
  showConfirmaSenha = false;

  constructor(
    public formbuilder: FormBuilder,
    public controleAcessoService: ControleAcessoService,
    public modalAlert: AlertComponent) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = (): void => {
    this.changePasswordFrom = this.formbuilder.group({
      senha: ['', [Validators.required]],
      confirmaSenha: ['', [Validators.required]]
    }) as FormGroup & ILogin;
  }

  onSaveClick = (): void => {
    this.controleAcessoService.changePassword(this.changePasswordFrom.getRawValue())
      .subscribe({
        next: (result: any) => {
          if (result.message === true) {
            this.initialize();
            this.modalAlert.open(AlertComponent, 'Senha alterada com sucesso!', AlertType.Success);
          }
        },
        error: (response: any) => {
          this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
        }
      });
  }

  onToogleSenha() {
    this.showSenha = !this.showSenha;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

  onToogleConfirmaSenha() {
    this.showConfirmaSenha = !this.showConfirmaSenha;
    this.eyeIconClassConfirmaSenha = (this.eyeIconClassConfirmaSenha === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }
}
