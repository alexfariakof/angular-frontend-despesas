import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
  }

  onClickNovo = () => {
    this.modalForm.open(CategoriasFormComponent);
  }

  onClickExcluir = () =>  {
    this.modalAlert.open(AlertComponent, "Clicou em Excluir da Categoria", 'Warning');
  }

  onClickCancelar = () => {
    this.modalAlert.open(AlertComponent, "Clicou em Cancelar da Categoria", 'Warning');
  }
}