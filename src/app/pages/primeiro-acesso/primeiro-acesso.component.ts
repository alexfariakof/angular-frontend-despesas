import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IControleAcesso } from "src/app/shared/interfaces/IControleAcesso";
import { Router } from '@angular/router';
import { ControleAcessoService } from 'src/app/shared/services/controle-acesso/controle-acesso.service';
import { map, catchError } from 'rxjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.scss'],
  providers: [ControleAcessoService, AlertComponent]
})
export class PrimeiroAcessoComponent  implements OnInit {
  public controleAcesso: IControleAcesso = {   nome: '', sobreNome: '', telefone: '', email: '', senha: '', confirmaSenha: '' };
  createAccountFrom : FormGroup;
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
      txtEmail: ['', [Validators.required, Validators.email]],
      txtNome: ['', [Validators.required]],
      txtSobreNome: ['', ],
      txtTelefone: ['', [Validators.required]],
      txtSenha: ['', [Validators.required]],
      txtConfirmaSenha: ['', [Validators.required]]
    })
  }

  onSaveClick() {
    this.controleAcessoService.createUsuario(this.controleAcesso).pipe(
      map((response: IControleAcesso | any) => {
        if (response.message === true) {
          return response.message;
        } else {
          throw response;
        }
      }),
      catchError((error) => {
        throw error;
      })
    )
    .subscribe({
      next: (result) => {
        if (result === true){
          this.modalALert.open(AlertComponent, "Cadastro realizado com sucesso!", 'Success');
        }
      },
      error: (response) =>  this.modalALert.open(AlertComponent, response.message, 'Warning'),
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

    if (this.controleAcesso.senha !== this.controleAcesso.confirmaSenha) {
      return true;
    } else {
      return false;
    }
  }
}

