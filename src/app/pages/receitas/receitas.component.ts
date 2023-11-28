import { Component, ViewChild } from '@angular/core';
import * as dayjs from 'dayjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal.confirm.component';
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal.form.component';
import { ReceitaColumns } from 'src/app/shared/datatable-config/receitas/receitas.columns';
import { ReceitaDataSet } from 'src/app/shared/datatable-config/receitas/receitas.dataSet';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { IReceita } from 'src/app/shared/interfaces/IReceita';
import { ReceitaService } from 'src/app/shared/services/api/receitas/receita.service';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements BarraFerramentaClass {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;
  private idUsuario: number = Number(localStorage.getItem('idUsuario')) || 0;
  receitasData: ReceitaDataSet[] = [];
  columns = ReceitaColumns;

  constructor(
    private menuService: MenuService,
    public modalAlert: AlertComponent,
    public modalForm: ModalFormComponent,
    public modalConfirm: ModalConfirmComponent,
    public receitaService: ReceitaService
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
  }

  onClickEdit = (idReceita: number) =>{
  }

  editReceita = (receita: IReceita) => {
  }

  onClickDelete = (idReceita: number) => {
  }

  deleteReceita = (idReceita: number) => {
  }
}
