import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlertComponent } from 'src/app/shared/components';
import { ICategoria, IReceita, IAction } from 'src/app/shared/interfaces';
import { ReceitaService } from 'src/app/shared/services/api';

@Component({
  selector: 'app-receitas-form',
  templateUrl: './receitas.form.component.html',
  styleUrls: ['./receitas.form.component.scss']
})

export class ReceitasFormComponent {
  private idUsuario: number = Number(localStorage.getItem('idUsuario'));
  categorias: ICategoria[]= [];
  receitaForm: FormGroup & IReceita;

  private _action: IAction = IAction.Create;
  get action(): IAction { return this._action; }
  set action(action: IAction) { this._action = action; }

  private _refresh: Function = () => {};
  get refresh(): Function { return this._refresh; }
  set refresh(refresh: Function) { this._refresh = refresh; }

  constructor(
    public formbuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public activeModal:NgbActiveModal,
    public receitaService: ReceitaService
    ) {}

  ngOnInit(): void{
    this.getCatgeoriasFromReceitas();
    this.receitaForm = this.formbuilder.group({
      id: [0],
      idUsuario: this.idUsuario,
      idCategoria: [null, Validators.required],
      categoria: null,
      data: [dayjs().format('YYYY-MM-DD'), Validators.required],
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, this.isGreaterThanZero]],
    }) as FormGroup & IReceita;
  }

  onSaveClick = () => {
    switch (this._action) {
      case IAction.Create:
        this.saveCreateReceita();
        break;
      case IAction.Edit:
        this.saveEditReceita();
        break;
      default:
        this.modalAlert.open(AlertComponent, 'Ação não pode ser realizada.', 'Warning');
    }
  }

  getCatgeoriasFromReceitas = () => {
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

  saveCreateReceita = () => {
    this.receitaService.postReceita(this.receitaForm.getRawValue() as IReceita)
    .subscribe({
      next: (result: any ) => {
        if (result.message === true) {
          this.activeModal.close();
          this._refresh();
          this.modalAlert.open(AlertComponent, 'Receita cadastrada com Sucesso.', 'Success');
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, 'Warning');
      }
    });
  }

  saveEditReceita = () => {
    this.receitaService.putReceita(this.receitaForm.getRawValue() as IReceita)
    .subscribe({
      next: (response: any ) => {
        if (response !== undefined && response !== null && response.message === true) {
          this.activeModal.close();
          this._refresh();
          this.modalAlert.open(AlertComponent, 'Receita alterada com Sucesso.', 'Success');
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, 'Warning');
      }
    });
  }

  editReceita = (idReceita: number) => {
    this.receitaService.getReceitaById(idReceita)
    .subscribe({
      next: (response: any) => {
        if (response.message === true && response.receita !== undefined && response.receita !== null)
          this.receitaForm.patchValue(response.receita);
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, 'Warning');
      }
    });
  }

  deleteReceita = (idReceita: number, callBack: Function) => {
    this.receitaService.deleteReceita(idReceita)
    .subscribe({
      next: (response: any) => {
        if (response.message === true){
          callBack();
          this.modalAlert.open(AlertComponent, 'Receita excluída com sucesso', 'Success');
        }
        else{
          this.modalAlert.open(AlertComponent, 'Erro ao excluír receita', 'Warning');
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
