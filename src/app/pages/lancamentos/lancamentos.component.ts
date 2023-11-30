import { UserDataService } from './../../shared/services/utils/user-data-service/user.data.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertComponent, AlertType, BarraFerramentaComponent, DataTableComponent, ModalConfirmComponent, ModalFormComponent } from "src/app/shared/components";
import { FilterMesAnoService, MenuService } from "src/app/shared/services";
import { ReceitasFormComponent } from '../receitas/receitas-form/receitas.form.component';
import { DespesasFormComponent } from './../despesas/despesas-form/despesas.form.component';
import { LancamentoService } from "src/app/shared/services/api";
import * as dayjs from "dayjs";
import { LancamentoDataSet, LancamentoColumns } from "src/app/shared/datatable-config/lancamentos";
import { IAction, ILancamento } from "src/app/shared/interfaces";
@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})

export class LancamentosComponent implements OnInit {
  @ViewChild(BarraFerramentaComponent) barraFerramenta: BarraFerramentaComponent;
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  lancamentosData: LancamentoDataSet[] = [];
  columns = LancamentoColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public lancamentoservice: LancamentoService,
    private despesasFormComponent: DespesasFormComponent,
    private receitasFormComponent: ReceitasFormComponent,
    public filterMesAnoService: FilterMesAnoService,
    private userDataService: UserDataService
    ) {  }

  ngOnInit() {
    this.menuService.menuSelecionado = 5;
    this.initializeDataTable();
  }

  initializeDataTable = () => {
    this.lancamentoservice.getLancamentosByMesAnoIdUsuario(dayjs(this.filterMesAnoService.dataMesAno), this.userDataService.getIdUsuario())
    .subscribe({
      next: (response: any) => {
        if (response.message === true)
        {
          this.lancamentosData = this.parseToLancamentosData(response.lancamentos as ILancamento[]);
          this.dataTable.loadData(this.getLancamentosData());
          this.dataTable.rerender();
          this.barraFerramenta.setOnChangeDataMesAno(() => { this.updateDatatable(); } );
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  updateDatatable = () => {
    this.lancamentoservice.getLancamentosByMesAnoIdUsuario(dayjs(this.filterMesAnoService.dataMesAno), this.userDataService.getIdUsuario())
    .subscribe({
      next: (response: any) => {
        if (response.message === true)
        {
          this.lancamentosData = this.parseToLancamentosData(response.lancamentos as ILancamento[]);
          this.dataTable.rerender();
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  getLancamentosData = () =>{
    return this.lancamentosData;
  }

  parseToLancamentosData(lancamentos: ILancamento[]): LancamentoDataSet[] {
    return lancamentos.map((lancamento: ILancamento) => ({
      id: lancamento.idDespesa === 0 ? lancamento.idReceita : lancamento.idDespesa,
      data: lancamento.data,
      tipoCategoria: lancamento.tipoCategoria,
      categoria: lancamento.categoria,
      descricao: lancamento.descricao,
      valor: `${ lancamento.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) }`
    }));
  }

  onClickEdit = (id: number, tipoCategoria: string) => {
    let  modalRef;
    if(tipoCategoria === 'Despesa'){
      modalRef = this.modalForm.modalService.open(DespesasFormComponent, { centered: true });
      modalRef.shown.subscribe(() => {
        modalRef.componentInstance.action = IAction.Edit;
        modalRef.componentInstance.refresh = () => { this.updateDatatable(); };
        modalRef.componentInstance.editDespesa(id);
      });
    }
    else{
      modalRef = this.modalForm.modalService.open(ReceitasFormComponent, { centered: true });
      modalRef.shown.subscribe(() => {
        modalRef.componentInstance.action = IAction.Edit;
        modalRef.componentInstance.refresh = () => { this.updateDatatable(); };
        modalRef.componentInstance.editReceita(id);
      });
    }
  }

  onClickDelete = (id: number, tipoCategoria: string) => {
    let modalRef;
    if(tipoCategoria === 'Despesa'){
      modalRef = this.modalConfirm.open(ModalConfirmComponent, `Deseja excluir a despesa ${ this.dataTable.row.descricao } ?`);
      modalRef.shown.subscribe(() => {
        modalRef.componentInstance.setConfirmButton(() => {
          this.despesasFormComponent.deleteDespesa(id, () => { this.updateDatatable(); });
        });
      });
    }
    else {
      modalRef = this.modalConfirm.open(ModalConfirmComponent, `Deseja excluir a receita ${ this.dataTable.row.descricao } ?`);
      modalRef.shown.subscribe(() => {
        modalRef.componentInstance.setConfirmButton(() => {
          this.receitasFormComponent.deleteReceita(id, () => { this.updateDatatable(); });
        });
      });
    }
  }
}
