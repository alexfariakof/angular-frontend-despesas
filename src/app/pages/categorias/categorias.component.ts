import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { ICategoria, ITipoCategoria, IAction } from './../../shared/interfaces';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { CategoriaColumns, CategoriaDataSet  } from 'src/app/shared/datatable-config/categorias';
import { DataTableComponent, AlertComponent, ModalFormComponent, ModalConfirmComponent, BarraFerramentaClass, AlertType } from 'src/app/shared/components';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements BarraFerramentaClass, OnInit {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  catgoriasData: CategoriaDataSet[] = [];
  columns = CategoriaColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public categoriaService: CategoriaService
    ) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.initializeDataTable();
  }

  initializeDataTable = () => {
    this.categoriaService.getCategorias()
    .subscribe({
      next: (result: ICategoria[]) => {
        if (result)
        {
          this.catgoriasData = this.parseToCategoriaData(result);
          this.dataTable.loadData(this.getCategoriasData());
          this.dataTable.rerender();
        }

      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  updateDatatable = () => {
    this.categoriaService.getCategorias()
    .subscribe({
      next: (result: any) => {
        if (result)
        {
          this.catgoriasData = this.parseToCategoriaData(result);
          this.dataTable.rerender();
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  getCategoriasData = () =>{
    return this.catgoriasData;
  }

  parseToCategoriaData(categorias: ICategoria[]): CategoriaDataSet[] {
    return categorias.map((categoria: ICategoria) => ({
      id: categoria.id,
      descricao: categoria.descricao,
      tipoCategoria: ITipoCategoria[categoria.idTipoCategoria] as string
    }));
  }

  onClickNovo = () => {
    const modalRef = this.modalForm.modalService.open(CategoriasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Create);
      modalRef.componentInstance.setRefresh(() => { this.updateDatatable(); });
    });
  }

  onClickEdit = (idCategoria: Number) => {
    this.categoriaService.getCategoriaById(idCategoria)
    .subscribe({
      next: (categoria: ICategoria) => {
        if (categoria !== undefined && categoria !== null)
          this.editCategoria(categoria);
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  editCategoria = (categoria: ICategoria) => {
    const modalRef = this.modalForm.modalService.open(CategoriasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Edit);
      modalRef.componentInstance.setRefresh(() => { this.updateDatatable(); });
      modalRef.componentInstance.setCategoria(categoria);
    });
  }

  onClickDelete = (idCategoria: Number) => {
    const modalRef = this.modalConfirm.open(ModalConfirmComponent, `Deseja excluir a categoria ${ this.dataTable.row.descricao } ?`);
    modalRef.componentInstance.setConfirmButton(() => { this.deleteCategoria(idCategoria); });
  }

  deleteCategoria = (idCategoria: Number) => {
    this.categoriaService.deleteCategoria(idCategoria)
    .subscribe({
      next: (response: any) => {
        if (response.message === true){
          this.updateDatatable();
          this.modalAlert.open(AlertComponent, "Categoria excluída com sucesso", AlertType.Success);
        }
        else{
          this.modalAlert.open(AlertComponent, 'Erro ao excluír categoria', AlertType.Warning);
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }
}
