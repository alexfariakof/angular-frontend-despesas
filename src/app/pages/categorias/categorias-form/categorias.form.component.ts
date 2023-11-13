import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { IControleAcesso } from 'src/app/shared/interfaces/IControleAcesso';

@Component({
  selector: 'app-categorias.form',
  templateUrl: './categorias.form.component.html',
  styleUrls: ['./categorias.form.component.scss']
})


export class CategoriasFormComponent implements OnInit {
  public controleAcesso: IControleAcesso = {   nome: '', sobreNome: '', telefone: '', email: '', senha: '', confirmaSenha: '' };
  createCategoriatForm : FormGroup;
  eyeIconClass: string = 'bi-eye';
  eyeIconClassConfirmaSenha: string = 'bi-eye';
  showSenha = false;
  showConfirmaSenha = false;


  constructor(public formbuilder: FormBuilder, public modalALert: AlertComponent, public activeModal:NgbActiveModal) { }

  ngOnInit(): void{
    this.createCategoriatForm = this.formbuilder.group({
      txtEmail: ['', [Validators.required, Validators.email]],
      txtNome: ['', [Validators.required]],
      txtSobreNome: ['', ],
      txtTelefone: ['', [Validators.required]],
      txtSenha: ['', [Validators.required]],
      txtConfirmaSenha: ['', [Validators.required]]
    })
  }


  onSaveClick = () => {
    this.modalALert.open(AlertComponent, 'Teste Modal Alert In Moadl Form', 'Success');
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
