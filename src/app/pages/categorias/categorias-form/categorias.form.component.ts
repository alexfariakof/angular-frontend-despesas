import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { IAction } from 'src/app/shared/interfaces/IAction';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias.form.component.html',
  styleUrls: ['./categorias.form.component.scss']
})

export class CategoriasFormComponent implements OnInit {
  private idUsuario : number = Number(localStorage.getItem('idUsuario')) || 0;

  categoriatForm: FormGroup;
  getCategoriaForm(): FormGroup{
    return this.categoriatForm;
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
    ) { }

  ngOnInit(): void{
    this.categoriatForm = this.formbuilder.group({
      idCategoria: new FormControl('idCategoria'),
      slctTipoCategoria: ['', [Validators.required ]],
      txtDescricao: ['', Validators.required]
  });
  }

  onSaveClick = () => {
    let categoria : ICategoria = {
      id: 0,
      descricao: this.categoriatForm.get('txtDescricao').value,
      idUsuario: this.idUsuario,
      idTipoCategoria: Number(this.categoriatForm.get('slctTipoCategoria').value)
    };

    try {
      if (this.action === IAction.Create){

        this.categoriaService.postCategoria(categoria)
        .subscribe({
          next: (result: any ) => {
            if (result.message == true)
            {
              this.activeModal.close();
              this.refresh();
              this.modalAlert.open(AlertComponent, "Categoria cadastrada com Sucesso.", 'Success');
            }
          },
          error :(error : any) =>  {
            this.modalAlert.open(AlertComponent, error.message, 'Warning');
          }
        });
      }
      else if (this.action === IAction.Edit) {
        categoria.id = Number(this.categoriatForm.get('idCategoria').value)
        this.categoriaService.putCategoria(categoria)
        .subscribe({
          next: (result: ICategoria ) => {
            if (result !== undefined || result !== null)
            {
              this.activeModal.close();
              this.refresh();
              this.modalAlert.open(AlertComponent, "Categoria alterada com Sucesso.", 'Success');
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
}
