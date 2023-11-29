import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as dayjs from "dayjs";
import { AlertComponent } from "src/app/shared/components";
import { ICategoria, IReceita, IAction } from "src/app/shared/interfaces";
import { ReceitaService } from "src/app/shared/services/api";
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
      valor: ['', [Validators.required, this.isGreaterThanZero]],
    }) as FormGroup & IReceita;
  }

  onSaveClick = () => {
    const receita : IReceita = this.receitaForm.getRawValue() as IReceita;
    switch (this.action) {
      case IAction.Create: return this.saveCreateReceita(receita);
      case IAction.Edit: return this.saveEditReceita(receita);
      default: this.modalAlert.open(AlertComponent, "Ação não pode ser realizada.", 'Warning');
    }
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

  saveCreateReceita = (receita: IReceita) => {
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

  saveEditReceita = (receita: IReceita) => {
    this.receitaService.putReceita(receita)
    .subscribe({
      next: (response: any ) => {
        if ((response !== undefined || response !== null) && response.message === true)
        {
          this.activeModal.close();
          this.refresh();
          this.modalAlert.open(AlertComponent, "Receita alterada com Sucesso.", 'Success');
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
        if (response.message === true && (response.receita !== undefined && response.receita !== null))
          this.setReceita(response.receita);
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
          this.modalAlert.open(AlertComponent, "Receita excluída com sucesso", 'Success');
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
    const value = control.value;
    if (value !== null && value > 0) {
      return null;
    } else {
      return { greaterThanZero: true };
    }
  }
}
