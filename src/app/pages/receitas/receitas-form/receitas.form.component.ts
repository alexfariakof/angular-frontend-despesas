import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { IReceita } from 'src/app/shared/interfaces/IReceita';
import { ReceitaService } from 'src/app/shared/services/api/receitas/receita.service';
@Component({
  selector: 'app-receitas-form',
  templateUrl: './receitas.form.component.html',
  styleUrls: ['./receitas.form.component.scss']
})
export class ReceitasFormComponent {
  private idUsuario: number = Number(localStorage.getItem('idUsuario')) || 0;
  categorias: ICategoria[]= [];
  receitaForm: FormGroup & IReceita;
  setReceita(receita: IReceita): void {
    this.receitaForm.patchValue(receita);
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
    public receitaService: ReceitaService
    ) {}

  ngOnInit(): void{
    this.getCatgeorias()
    this.receitaForm = this.formbuilder.group({
      id: [0],
      idUsuario: this.idUsuario,
      idCategoria: [null, Validators.required],
      categoria: null,
      data: [dayjs().format('YYYY-MM-DD'), Validators.required],
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, this.greaterThanZero]],
    }) as FormGroup & IReceita;
  }

  getCatgeorias = () => {
    this.receitaService.getCategorias(this.idUsuario)
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
    const receita : IReceita = this.receitaForm.getRawValue() as IReceita;
    if (this.action === IAction.Create){
      this.receitaService.postReceita(receita)
      .subscribe({
        next: (result: any ) => {
          if (result.message === true)
          {
            this.activeModal.close();
            this.refresh();
            this.modalAlert.open(AlertComponent, "Receita cadastrada com Sucesso.", 'Success');
          }
        },
        error :(error : any) =>  {
          this.modalAlert.open(AlertComponent, error.message, 'Warning');
        }
      });
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
