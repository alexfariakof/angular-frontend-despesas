import { Component, ViewChild } from "@angular/core";
import * as dayjs from "dayjs";
import { BarraFerramentaClass, DataTableComponent, AlertComponent, ModalFormComponent, ModalConfirmComponent } from "src/app/shared/components";
import { ReceitaDataSet, ReceitaColumns } from "src/app/shared/datatable-config/receitas";
import { IReceita, IAction } from "src/app/shared/interfaces";
import { MenuService } from "src/app/shared/services";
import { ReceitaService } from "src/app/shared/services/api";
import { ReceitasFormComponent } from "./receitas-form/receitas.form.component";
@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements BarraFerramentaClass {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  private idUsuario: number = Number(localStorage.getItem('idUsuario'));
  receitasData: ReceitaDataSet[] = [];
  columns = ReceitaColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public receitaService: ReceitaService,
    private receitasFormComponent: ReceitasFormComponent
    ) { }

  ngOnInit() {
    this.menuService.menuSelecionado = 4;
    this.initializeDataTable();
  }

  initializeDataTable = () => {
    this.receitaService.getReceitaByIdUsuario(this.idUsuario)
    .subscribe({
      next: (result: IReceita[]) => {
        if (result)
        {
          this.receitasData = this.parseToReceitaData(result);
          this.dataTable.loadData(this.getReceitasData());
          this.dataTable.rerender();
        }

      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  updateDatatable = () => {
    this.receitaService.getReceitaByIdUsuario(this.idUsuario)
    .subscribe({
      next: (result: any) => {
        if (result)
        {
          this.receitasData = this.parseToReceitaData(result);
          this.dataTable.rerender();
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  getReceitasData = () =>{
    return this.receitasData;
  }

  parseToReceitaData(receitas: IReceita[]): ReceitaDataSet[] {
    return receitas.map((receita: IReceita) => ({
      id: receita.id,
      data: dayjs(receita.data).format('DD/MM/YYYY'),
      categoria: receita.categoria,
      descricao: receita.descricao,
      valor: `${ receita.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) }`
    }));
  }

  onClickNovo = () => {
    const modalRef = this.modalForm.modalService.open(ReceitasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Create);
      modalRef.componentInstance.setRefresh(() => { this.updateDatatable(); });
    });
  }

  onClickEdit = (idReceita: number) =>{
    const modalRef = this.modalForm.modalService.open(ReceitasFormComponent, { centered: true });
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setAction(IAction.Edit);
      modalRef.componentInstance.setRefresh(() => { this.updateDatatable(); });
      modalRef.componentInstance.editReceita(idReceita);
    });
  }

  onClickDelete = (idReceita: number) => {
    const modalRef = this.modalConfirm.open(ModalConfirmComponent, `Deseja excluir a receita ${ this.dataTable.row.descricao } ?`);
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.setConfirmButton(() => {
        this.receitasFormComponent.deleteReceita(idReceita, () => { this.updateDatatable(); });
      });
    });
  }
}
