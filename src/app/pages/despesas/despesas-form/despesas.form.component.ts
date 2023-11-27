import { ScrollStrategy } from '@angular/cdk/overlay';
import { Component, InjectionToken } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { IDespesa } from 'src/app/shared/interfaces/IDespesa';
import { DespesaService } from 'src/app/shared/services/api/despesas/despesa.service';

@Component({
  selector: 'app-despesas-form',
  templateUrl: './despesas.form.component.html',
  styleUrls: ['./despesas.form.component.scss']
})

export class DespesasFormComponent {
  private idUsuario: number = Number(localStorage.getItem('idUsuario')) || 0;
  MAT_DATEPICKER_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
  categorias: ICategoria[]= [];
  despesatForm: FormGroup & IDespesa;
  setDespesa(despesa: IDespesa): void {
    this.despesatForm.patchValue(despesa);
  }

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
    this.despesatForm = this.formbuilder.group({
      id: [0],
      idUsuario: this.idUsuario,
      idCategoria: [null, Validators.required],
      categoria: null,
      data: [dayjs().format('YYYY-MM-DD'), Validators.required],
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, this.greaterThanZero]],
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
    const despesa : IDespesa = this.despesatForm.getRawValue() as IDespesa;
    try {
      if (this.action === IAction.Create){

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
      else if (this.action === IAction.Edit) {
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
    }
    catch(error){
      this.modalAlert.open(AlertComponent, error.message, 'Warning');
    }
  }

  greaterThanZero = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value > 0) {
      return null;
    } else {
      return { greaterThanZero: true };
    }
  }

}
