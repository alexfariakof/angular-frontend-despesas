import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { ICategoria } from './../../shared/interfaces/ICategoria';
import { ITipoCategoria } from './../../shared/interfaces/ITipoCategoria';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements BarraFerramentaClass {
  catgorias: ICategoria[] =
  [
    {
      id: 1,
      descricao: 'Categoria 1',
      idUsuario: 1,
      idTipoCategoria: 1
    },
    {
      id: 2,
      descricao: 'Categoria 2',
      idUsuario: 1,
      idTipoCategoria: 2,
    },
    {
      id: 3,
      descricao: 'Categoria 3',
      idUsuario: 2,
      idTipoCategoria: 1,
    }
  ];

  columns = [
    {
      title:'',
      data: 'edit',
    },
    {
      title:'',
      data: 'delete',
    },
    {
      title: 'ID',
      data: 'id'
    },
    {
      title: 'Descrição',
      data: 'descricao'
    },
    {
      title: 'Tipo Catategoria',
      data: 'tipoCategoria'
    }
  ];

  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public dataTable: DataTableComponent
    ) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.dataTable.ngOnInit();
  }

  onClickNovo = () => {
    this.modalForm.open(CategoriasFormComponent);
  }

  getCategoriasData = () => this.catgorias.map((categoria: ICategoria) => {
    return {
      id: categoria.id,
      descricao: categoria.descricao,
      tipoCategoria: ITipoCategoria[categoria.idTipoCategoria]
    };
  });

  onEdit = (message) => {
    this.modalAlert.open(AlertComponent, 'Editar Categortia: ' + message, 'Success');
  }

  onDelete = (message) => {
    this.modalAlert.open(AlertComponent, 'Deletar Categoria:' + message, 'Warning');
  }

}
