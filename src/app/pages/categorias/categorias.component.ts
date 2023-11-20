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
import { IAction } from 'src/app/shared/interfaces/IAction';

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
      title: 'Tipo Catategoria',
      data: 'tipoCategoria'
    },
    {
      title: 'Descrição',
      data: 'descricao'
    }
  ];

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public categoriaService: CategoriaService
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

  onEdit = (idCategoria: Number) => {
    this.categoriaService.getCategoriaById(idCategoria)
    .subscribe({
      next: (categoria: ICategoria) => {
        if (categoria !== undefined || categoria !== null)
        {
          const modalRef = this.modalForm.modalService.open(CategoriasFormComponent);
          modalRef.shown.subscribe(() => {
            modalRef.componentInstance.setAction(IAction.Edit);
            modalRef.componentInstance.getCategoriaForm().get('idCategoria').setValue(categoria.id);
            modalRef.componentInstance.getCategoriaForm().get('txtDescricao').setValue(categoria.descricao);
            modalRef.componentInstance.getCategoriaForm().get('slctTipoCategoria').setValue(categoria.idTipoCategoria);
          });
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  onDelete = (idCategoria: Number) => {
    this.categoriaService.deleteCategoria(idCategoria)
    .subscribe({
      next: (categoria: any) => {
        if (categoria.message === true){
          this.modalAlert.open(AlertComponent, "Categoria excluída com sucesso", 'Success');
          setTimeout(()=>{
            window.location.reload();
          }, 3000);
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  initializeDataTable() {
    setTimeout(() => {
      this.dataTable.refresh(this.getCategoriasData());
    });
  }
}
