import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { ICategoria } from './../../shared/interfaces/ICategoria';
import { ITipoCategoria } from './../../shared/interfaces/ITipoCategoria';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { IAction } from 'src/app/shared/interfaces/IAction';
import RefreshService from 'src/app/shared/services/utils/refersh-service/refresh.service';
import { Subscription } from 'rxjs';
import { CategoriaColumns } from 'src/app/shared/datatable-config/categorias/categoria.columns';
import { CategoriaDataSet } from 'src/app/shared/datatable-config/categorias/categoria.dataSet';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal.confirm.component';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements BarraFerramentaClass, OnInit, OnDestroy {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  private refreshSubscription: Subscription;
  catgoriasData: CategoriaDataSet[] = [];
  columns = CategoriaColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public categoriaService: CategoriaService,
    public refreshService: RefreshService
    ) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.refreshSubscription = this.refreshService.onRefresh().subscribe(() => {
      this.updateDatatable();
    });
    this.initializeDataTable();
  }

  ngOnDestroy(): void {
    /*
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    */
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
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
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
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
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
      modalRef.componentInstance.setRefresh(() => { this.refreshService.refresh(); });
    });
  }

  onClickEdit = (idCategoria: Number) => {
    this.categoriaService.getCategoriaById(idCategoria)
    .subscribe({
      next: (categoria: ICategoria) => {
        if (categoria !== undefined || categoria !== null)
          this.editCategoria(categoria);
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  editCategoria = (categoria: ICategoria) => {
    const modalRef = this.modalForm.modalService.open(CategoriasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Edit);
      modalRef.componentInstance.setRefresh(() => { this.refreshService.refresh(); });
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
          this.refreshService.refresh();
          this.modalAlert.open(AlertComponent, "Categoria excluída com sucesso", 'Success');
        }
        else{
          this.modalAlert.open(AlertComponent, 'Erro ao excluír categoria', 'Warning');
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }
}
