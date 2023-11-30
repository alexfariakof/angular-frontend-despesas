import { UserDataService } from './../../../shared/services/utils/user-data-service/user.data.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlertComponent, AlertType } from 'src/app/shared/components';
import { ICategoria, IReceita, IAction } from 'src/app/shared/interfaces';
import { ReceitaService } from 'src/app/shared/services/api';

@Component({
  selector: 'app-receitas-form',
  templateUrl: './receitas.form.component.html',
  styleUrls: ['./receitas.form.component.scss']
})

export class ReceitasFormComponent {
  categorias: ICategoria[]= [];
  receitaForm: FormGroup & IReceita;
  action: IAction = IAction.Create;
  refresh: Function = () => {};

  constructor(
    public formbuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public activeModal:NgbActiveModal,
    public receitaService: ReceitaService,
    private userDataService: UserDataService
    ) {}

  ngOnInit(): void{
    this.getCatgeoriasFromReceitas();
    this.receitaForm = this.formbuilder.group({
      id: [0],
      idUsuario: this.userDataService.getIdUsuario(),
      idCategoria: [null, Validators.required],
      categoria: null,
      data: [dayjs().format('YYYY-MM-DD'), Validators.required],
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, this.isGreaterThanZero]],
    }) as FormGroup & IReceita;
  }

  onSaveClick = () => {
    switch (this.action) {
      case IAction.Create:
        this.saveCreateReceita();
        break;
      case IAction.Edit:
        this.saveEditReceita();
        break;
      default:
        this.modalAlert.open(AlertComponent, 'Ação não pode ser realizada.', AlertType.Warning);
    }
  }

  getCatgeoriasFromReceitas = () => {
    this.receitaService.getCategorias(this.userDataService.getIdUsuario())
      .subscribe({
        next: (result: ICategoria[]) => {
          if (result)
            this.categorias = result;
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  saveCreateReceita = () => {
    this.receitaService.postReceita(this.receitaForm.getRawValue() as IReceita)
    .subscribe({
      next: (result: any ) => {
        if (result.message === true) {
          this.activeModal.close();
          this.refresh();
          this.modalAlert.open(AlertComponent, 'Receita cadastrada com Sucesso.', AlertType.Success);
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, AlertType.Warning);
      }
    });
  }

  saveEditReceita = () => {
    this.receitaService.putReceita(this.receitaForm.getRawValue() as IReceita)
    .subscribe({
      next: (response: any ) => {
        if (response !== undefined && response !== null && response.message === true) {
          this.activeModal.close();
          this.refresh();
          this.modalAlert.open(AlertComponent, 'Receita alterada com Sucesso.', AlertType.Success);
        }
      },
      error :(error : any) =>  {
        this.modalAlert.open(AlertComponent, error.message, AlertType.Warning);
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
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  deleteReceita = (idReceita: number, callBack: Function) => {
    this.receitaService.deleteReceita(idReceita)
    .subscribe({
      next: (response: any) => {
        if (response.message === true){
          callBack();
          this.modalAlert.open(AlertComponent, 'Receita excluída com sucesso', AlertType.Success);
        }
        else{
          this.modalAlert.open(AlertComponent, 'Erro ao excluír receita', AlertType.Warning);
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
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
