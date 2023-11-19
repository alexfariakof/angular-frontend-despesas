import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { ICategoria } from './../../shared/interfaces/ICategoria';
import { ITipoCategoria } from './../../shared/interfaces/ITipoCategoria';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements BarraFerramentaClass, OnInit, OnChanges {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  catgorias: ICategoria[] = [];
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
    public categoriaService: CategoriaService,
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTable.refresh(this.getCategoriasData());
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.categoriaService.getCategorias()
    .subscribe({
      next: (result: ICategoria[]) => {
        if (result)
        {
          this.catgorias = result;
          this.initializeDataTable();
        }

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
      id: categoria.id,
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

  initializeDataTable() {
    setTimeout(() => {
      this.dataTable.refresh(this.getCategoriasData());
    });
  }
}
