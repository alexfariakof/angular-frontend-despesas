import { Component, OnInit, ViewChild } from "@angular/core";
import * as dayjs from "dayjs";
import { BarraFerramentaClass, DataTableComponent, AlertComponent, ModalFormComponent, ModalConfirmComponent, AlertType } from "src/app/shared/components";
import { DespesaDataSet, DespesaColumns } from "src/app/shared/datatable-config/despesas";
import { IDespesa, IAction } from "src/app/shared/interfaces";
import { MenuService } from "src/app/shared/services";
import { DespesaService } from "src/app/shared/services/api";
import { DespesasFormComponent } from "./despesas-form/despesas.form.component";
@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements BarraFerramentaClass, OnInit {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  despesasData: DespesaDataSet[] = [];
  columns = DespesaColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public despesaService: DespesaService,
    private despesasFormComponent: DespesasFormComponent) { }

  ngOnInit() {
    this.menuService.setMenuSelecionado(3);
    this.initializeDataTable();
  }

  initializeDataTable = () => {
    this.despesaService.getDespesas()
      .subscribe({
        next: (result: IDespesa[]) => {
          if (result) {
            this.despesasData = this.parseToDespesasData(result);
            this.dataTable.loadData(this.despesasData);
            this.dataTable.rerender();
          }
        },
        error: (response: any) => {
          this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
        }
      });
  }

  updateDatatable = () => {
    this.despesaService.getDespesas()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.despesasData = this.parseToDespesasData(result);
            this.dataTable.rerender();
          }
        },
        error: (response: any) => {
          this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
        }
      });
  }

  parseToDespesasData(despesas: IDespesa[]): DespesaDataSet[] {
    return despesas.map((despesa: IDespesa) => ({
      id: despesa.id,
      data: dayjs(despesa.data).format('DD/MM/YYYY'),
      categoria: despesa.categoria.descricao,
      descricao: despesa.descricao,
      valor: `${despesa.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      dataVencimento: (despesa.dataVencimento && dayjs(despesa.dataVencimento).isValid()) ? dayjs(despesa.dataVencimento).format('DD/MM/YYYY') : null
    }));
  }

  onClickNovo = () => {
    const modalRef = this.modalForm.modalService.open(DespesasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.action = IAction.Create;
      modalRef.componentInstance.setRefresh(this.updateDatatable);
    });
  }

  onClickEdit = (idDespesa: number) => {
    const modalRef = this.modalForm.modalService.open(DespesasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.action = IAction.Edit;
      modalRef.componentInstance.setRefresh(this.updateDatatable);
      modalRef.componentInstance.editDespesa(idDespesa);
    });
  }

  onClickDelete = (idDespesa: number) => {
    const modalRef = this.modalConfirm.open(ModalConfirmComponent, `Deseja excluir a despesa ${this.dataTable.row.descricao} ?`);
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setConfirmButton(() => this.despesasFormComponent.deleteDespesa(idDespesa, this.updateDatatable));
    });
  }
}
