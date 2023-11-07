import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IControleAcesso } from "src/app/shared/interfaces/IControleAcesso";
import { SuccessAlertComponent } from 'src/app/shared/components/success-alert/success-alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningAlertComponent } from 'src/app/shared/components/warning-alert/warning-alert.component';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.scss']
})
export class PrimeiroAcessoComponent  implements OnInit {
  public controleAcesso: IControleAcesso = {   nome: '', sobreNome: '', telefone: '', email: '', senha: '', confirmaSenha: '' };
  createAccountFrom : FormGroup;
  eyeIconClass: string = 'bi-eye';
  eyeIconClassConfirmaSenha: string = 'bi-eye';
  showSenha = false;
  showConfirmaSenha = false;
  message: string = "";

  constructor(public formbuilder: FormBuilder, private modalService: NgbModal) {  }
  ngOnInit(): void{
    this.createAccountFrom = this.formbuilder.group({
      txtEmail: ['', [Validators.required, Validators.email]],
      txtNome: ['', [Validators.required]],
      txtSobreNome: ['', ],
      txtTelefone: ['', [Validators.required]],
      txtSenha: ['', [Validators.required]],
      txtConfirmaSenha: ['', Validators.required]
    })
  }

  onSaveClick() {
    const modalRef = this.modalService.open(SuccessAlertComponent);
    modalRef.componentInstance.message = "Cadastro realizado com sucesso!";

   }

  onToogleSenha() {
    this.showSenha = !this.showSenha;
    this.eyeIconClass = (this.eyeIconClass === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';
  }

  onToogleConfirmaSenha(){
    this.showConfirmaSenha = !this.showConfirmaSenha;
    this.eyeIconClassConfirmaSenha = (this.eyeIconClassConfirmaSenha === 'bi-eye') ? 'bi-eye-slash' : 'bi-eye';

  }

}

