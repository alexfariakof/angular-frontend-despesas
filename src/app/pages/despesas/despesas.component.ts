import { CategoriaDataSet } from 'src/app/shared/datatable-config/categorias/categoria.dataSet';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as dayjs from 'dayjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal.confirm.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { DespesaColumns } from 'src/app/shared/datatable-config/despesas/despesas.columns';
import { DespesaDataSet } from 'src/app/shared/datatable-config/despesas/despesas.dataSet';
import { IDespesa } from 'src/app/shared/interfaces/IDespesa';
import { DespesaService } from 'src/app/shared/services/api/despesas/despesa.service';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
import { DespesasFormComponent } from './despesas-form/despesas.form.component';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { ITipoCategoria } from 'src/app/shared/interfaces/ITipoCategoria';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements BarraFerramentaClass, OnInit {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  private idUsuario: number = Number(localStorage.getItem('idUsuario')) || 0;
  despesasData: DespesaDataSet[] = [];
  columns = DespesaColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public despesaService: DespesaService
    ) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 3;
    this.initializeDataTable();
  }


  initializeDataTable = () => {
    this.despesaService.getDespesaByIdUsuario(this.idUsuario)
    .subscribe({
      next: (result: IDespesa[]) => {
        if (result)
        {
          this.despesasData = this.parseToDespeasData(result);
          this.dataTable.loadData(this.getDespesasData());
          this.dataTable.rerender();
        }

      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  updateDatatable = () => {
    this.despesaService.getDespesaByIdUsuario(this.idUsuario)
    .subscribe({
      next: (result: any) => {
        if (result)
        {
          this.despesasData = this.parseToDespeasData(result);
          this.dataTable.rerender();
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  getDespesasData = () =>{
    return this.despesasData;
  }

  parseToDespeasData(despesas: IDespesa[]): DespesaDataSet[] {
    return despesas.map((despesa: IDespesa) => ({
      id: despesa.id,
      data: dayjs(despesa.data).format('DD/MM/YYYY'),
      descricao: despesa.descricao,
      valor: `${ despesa.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) }`,
      dataVencimento: (despesa.dataVencimento && dayjs(despesa.dataVencimento).isValid()) ? dayjs(despesa.dataVencimento).format('DD/MM/YYYY') : null
    }));
  }

  onClickNovo = () => {
    const modalRef = this.modalForm.modalService.open(DespesasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Create);
      modalRef.componentInstance.setRefresh(() => { this.updateDatatable(); });
    });
  }

  onClickEdit = (idDespesa: Number) =>{
    this.despesaService.getDespesaById(idDespesa)
    .subscribe({
      next: (response: any) => {
        if (response.message === true && (response.despesa !== undefined || response.despesa !== null))
          this.editDespesa(response.despesa);
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  editDespesa = (despesa: IDespesa) => {
    const modalRef = this.modalForm.modalService.open(DespesasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Edit);
      modalRef.componentInstance.setRefresh(() => { this.updateDatatable(); });
      modalRef.componentInstance.setDespesa(despesa);
    });
  }


  onClickDelete = (idDespesa: Number) => {
    this.despesaService.deleteDespesa(idDespesa)
    .subscribe({
      next: (response: any) => {
        if (response.message === true){
          this.updateDatatable();
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
