import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent, AlertType } from 'src/app/shared/components';
import { ICategoria, IAction } from 'src/app/shared/interfaces';
import { CategoriaService } from 'src/app/shared/services/api';
@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias.form.component.html',
  styleUrls: ['./categorias.form.component.scss']
})

export class CategoriasFormComponent implements OnInit {
  private idUsuario: number = Number(localStorage.getItem('idUsuario'));

  categoriatForm: FormGroup & ICategoria;
  setCategoria(categoria): void {
    this.categoriatForm.patchValue(categoria);
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
    public categoriaService: CategoriaService
    ) {}

  ngOnInit(): void{
    this.categoriatForm = this.formbuilder.group({
      id: [0, Validators.required],
      descricao: ['', Validators.required],
      idUsuario: this.idUsuario,
      idTipoCategoria: ['', Validators.required]
      }) as FormGroup & ICategoria;
  }

  onSaveClick = () => {
    let categoria = this.categoriatForm.getRawValue();
    try {
      if (this.action === IAction.Create){

        this.categoriaService.postCategoria(categoria)
        .subscribe({
          next: (result: any ) => {
            if (result.message == true)
            {
              this.activeModal.close();
              this.refresh();
              this.modalAlert.open(AlertComponent, "Categoria cadastrada com Sucesso.", AlertType.Success);
            }
          },
          error :(error : any) =>  {
            this.modalAlert.open(AlertComponent, error.message, AlertType.Warning);
          }
        });
      }
      else if (this.action === IAction.Edit) {
        this.categoriaService.putCategoria(categoria)
        .subscribe({
          next: (result: ICategoria ) => {
            if (result !== undefined || result !== null)
            {
              this.activeModal.close();
              this.refresh();
              this.modalAlert.open(AlertComponent, "Categoria alterada com Sucesso.", AlertType.Success);
            }
          },
          error :(error : any) =>  {
            this.modalAlert.open(AlertComponent, error.message, AlertType.Warning);
          }
        });
      }
    }
    catch(error){
      this.modalAlert.open(AlertComponent, error.message, AlertType.Warning);
    }
  }
}
