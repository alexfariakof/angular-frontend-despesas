import { Component } from '@angular/core';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { ICategoria } from './../../shared/interfaces/ICategoria';
import { ITipoCategoria } from './../../shared/interfaces/ITipoCategoria';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements BarraFerramentaClass {
  catgorias: ICategoria[];
  columns = [
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
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public dataTable: DataTableComponent,
    public categoriaService: CategoriaService,
    ) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.categoriaService.getCategorias()
    .subscribe({
      next: (result: ICategoria[]) => {
        if (result)
          this.catgorias = result;

      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });

  }

  onClickNovo = () => {
    this.modalForm.open(CategoriasFormComponent);
  }

  getCategoriasData = () => this.catgorias.map((categoria: ICategoria) => {
    return {
      descricao: categoria.descricao,
      tipoCategoria: ITipoCategoria[categoria.idTipoCategoria] as String
    };
  });

  onEdit = (message: String) => {
    this.modalAlert.open(AlertComponent, 'Editar Categortia: ' + message, 'Success');
  }

  onDelete = (message: String) => {
    this.modalAlert.open(AlertComponent, 'Deletar Categoria:' + message, 'Warning');
  }

}
