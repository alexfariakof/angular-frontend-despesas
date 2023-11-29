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
  private idUsuario: number = Number(localStorage.getItem('idUsuario'));
  categorias: ICategoria[]= [];
  despesaForm: FormGroup & IDespesa;

  private _action: IAction = IAction.Create;
  set action(action: IAction) { this._action = action; }

  private _refresh: Function = () => {};
  set refresh(refresh: Function) { this._refresh = refresh; }

  constructor(
    public formbuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public activeModal:NgbActiveModal,
    public despesaService: DespesaService
    ) {}

  ngOnInit(): void{
    this.getCatgeoriasFromDespesas();
    this.despesaForm = this.formbuilder.group({
      id: [0],
      idUsuario: this.idUsuario,
      idCategoria: [null, Validators.required],
      categoria: null,
      data: [dayjs().format('YYYY-MM-DD'), Validators.required],
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, this.isGreaterThanZero]],
      dataVencimento: null
    }) as FormGroup & IDespesa;
  }

  getCatgeoriasFromDespesas = () => {
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
    switch (this._action) {
      case IAction.Create:
        this.saveCreateDespesa();
        break;
      case IAction.Edit:
        this.saveEditDespesa();
        break;
      default:
        this.modalAlert.open(AlertComponent, 'Ação não pode ser realizada.', 'Warning');
    }
  }

  saveCreateDespesa = () => {
    this.despesaService.postDespesa(this.despesaForm.getRawValue() as IDespesa)
    .subscribe({
      next: (result: any ) => {
        if (result.message === true)
        {
          this.activeModal.close();
          this._refresh();
          this.modalAlert.open(AlertComponent, 'Despesa cadastrada com Sucesso.', 'Success');
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, 'Warning');
      }
    });
  }

  saveEditDespesa = () => {
    this.despesaService.putDespesa(this.despesaForm.getRawValue() as IDespesa)
    .subscribe({
      next: (response: any ) => {
        if (response !== undefined && response !== null && response.message === true)
        {
          this.activeModal.close();
          this._refresh();
          this.modalAlert.open(AlertComponent, 'Despesa alterada com Sucesso.', 'Success');
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
        if (response.message === true && response.despesa !== undefined && response.despesa !== null)
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
          this.modalAlert.open(AlertComponent, 'Despesa excluída com sucesso', 'Success');
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
    let value = control.value;
    if (value !== null && value > 0) {
      return null;
    } else {
      return { greaterThanZero: true };
    }
  }
}
