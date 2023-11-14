import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements BarraFerramentaClass {
  dtOptions: DataTables.Settings = {};

  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };

  }

  onClickNovo = () => {
    this.modalForm.open(CategoriasFormComponent);
  }
}
