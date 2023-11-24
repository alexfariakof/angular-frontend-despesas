import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IControleAcesso } from "src/app/shared/interfaces/IControleAcesso";
import { Router } from '@angular/router';
import { ControleAcessoService } from 'src/app/shared/services/api/controle-acesso/controle-acesso.service';
import { map, catchError } from 'rxjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.scss'],

})
export class PrimeiroAcessoComponent  implements OnInit {
  createAccountFrom : FormGroup & IControleAcesso;
  eyeIconClass: string = 'bi-eye';
  eyeIconClassConfirmaSenha: string = 'bi-eye';
  showSenha = false;
  showConfirmaSenha = false;

  constructor(
    public formbuilder: FormBuilder,
    public router: Router,
    public controleAcessoService: ControleAcessoService,
    public modalALert: AlertComponent) {
  }

  ngOnInit(): void{
    this.createAccountFrom = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      sobreNome: '',
      telefone: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmaSenha: ['', [Validators.required]]
    })as FormGroup & IControleAcesso;
  }

  onSaveClick() {
    let controleAcesso: IControleAcesso = this.createAccountFrom.getRawValue();
    this.controleAcessoService.createUsuario(controleAcesso).pipe(
      map((response: IControleAcesso | any) => {
        if (response.message === true) {
          return response.message;
        } else {
          throw response;
        }
      }),
      catchError((error) => {
        throw error.error || error;
      })
    )
    .subscribe({
      next: (result: Boolean) => {
        if (result === true){
          this.modalALert.open(AlertComponent, "Cadastro realizado com sucesso!", 'Success');
        }
      },
      error: (response: any) =>  this.modalALert.open(AlertComponent, response.message, 'Warning'),
      complete() {}
    });
  }

  onToogleSenha() {
    this.showSenha = !this.showSenha;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

  onToogleConfirmaSenha(){
    this.showConfirmaSenha = !this.showConfirmaSenha;
    this.eyeIconClassConfirmaSenha = (this.eyeIconClassConfirmaSenha === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

  isPasswordValid(): boolean {
    let senha = this.createAccountFrom.get('senha').value;
    let confirmaSenha = this.createAccountFrom.get('confirmaSenha').value;
    if (senha !== confirmaSenha) {
      return false;
    } else {
      return true;
    }
  }
}
