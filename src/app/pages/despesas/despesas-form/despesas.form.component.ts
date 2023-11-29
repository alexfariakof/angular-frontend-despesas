import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlertComponent } from 'src/app/shared/components';
import { IDespesa, ICategoria, IAction } from 'src/app/shared/interfaces';
import { DespesaService } from 'src/app/shared/services/api';

@Component({
  selector: 'app-despesas-form',
  templateUrl: './despesas.form.component.html',
  styleUrls: ['./despesas.form.component.scss']
})

export class DespesasFormComponent {
  private idUsuario: number = Number(localStorage.getItem('idUsuario')) || 0;
  categorias: ICategoria[]= [];
  despesaForm: FormGroup & IDespesa;
  private action: IAction = IAction.Create;
  setAction(_action: IAction){
    this.action = _action;
  }
  private refresh: Function = () => {};
  setRefresh(_refresh: Function) {
    this.refresh = _refresh;
  }

  constructor(
    public formbuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public activeModal:NgbActiveModal,
    public despesaService: DespesaService
    ) {}

  ngOnInit(): void{
    this.getCatgeorias()
    this.despesaForm = this.formbuilder.group({
      id: [0],
      idUsuario: this.idUsuario,
      idCategoria: [null, Validators.required],
      categoria: null,
      data: [dayjs().format('YYYY-MM-DD'), Validators.required],
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, this.isGreaterThanZero]],
      dataVencimento: null
    }) as FormGroup & IDespesa;
  }

  getCatgeorias = () => {
    this.despesaService.getCategorias(this.idUsuario)
      .subscribe({
        next: (result: ICategoria[]) => {
          if (result)
            this.categorias = result;
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  onSaveClick = () => {
    const despesa : IDespesa = this.despesaForm.getRawValue() as IDespesa;
    switch (this.action) {
      case IAction.Create: return this.saveCreateDespesa(despesa);
      case IAction.Edit: return this.saveEditDespesa(despesa);
      default: this.modalAlert.open(AlertComponent, "Ação não pode ser realizada.", 'Warning');
    }
  }

  saveCreateDespesa = (despesa: IDespesa) => {
    this.despesaService.postDespesa(despesa)
    .subscribe({
      next: (result: any ) => {
        if (result.message === true)
        {
          this.activeModal.close();
          this.refresh();
          this.modalAlert.open(AlertComponent, "Despesa cadastrada com Sucesso.", 'Success');
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, 'Warning');
      }
    });
  }

  saveEditDespesa = (despesa: IDespesa) => {
    this.despesaService.putDespesa(despesa)
    .subscribe({
      next: (response: any ) => {
        if ((response !== undefined || response !== null) && response.message === true)
        {
          this.activeModal.close();
          this.refresh();
          this.modalAlert.open(AlertComponent, "Despesa alterada com Sucesso.", 'Success');
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, 'Warning');
      }
    });
  }

  editDespesa = (idDespesa: number) => {
    this.despesaService.getDespesaById(idDespesa)
    .subscribe({
      next: (response: any) => {
        if (response.message === true && (response.despesa !== undefined && response.despesa !== null))
        this.despesaForm.patchValue(response.despesa);
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  deleteDespesa = (idDespesa: number, callBack: Function) => {
    this.despesaService.deleteDespesa(idDespesa)
    .subscribe({
      next: (response: any) => {
        if (response.message === true){
          callBack();
          this.modalAlert.open(AlertComponent, "Despesa excluída com sucesso", 'Success');
        }
        else{
          this.modalAlert.open(AlertComponent, 'Erro ao excluír despesa', 'Warning');
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  isGreaterThanZero = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value > 0) {
      return null;
    } else {
      return { greaterThanZero: true };
    }
  }
}
