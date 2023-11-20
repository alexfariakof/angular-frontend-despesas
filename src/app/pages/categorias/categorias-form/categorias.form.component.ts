import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ICategoria } from 'src/app/shared/interfaces/ICategoria';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias.form.component.html',
  styleUrls: ['./categorias.form.component.scss']
})

export class CategoriasFormComponent implements OnInit {
  private idUsuario : number = Number(localStorage.getItem('idUsuario')) || 0;
  createCategoriatForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public activeModal:NgbActiveModal,
    public categoriaService: CategoriaService,
    ) { }

  ngOnInit(): void{
    this.createCategoriatForm = this.formbuilder.group({
      slctTipoCategoria: ['', [Validators.required ]],
      txtDescricao: ['', Validators.required]
  });
  }

  onSaveClick = () => {
    const categoria : ICategoria = {
      id: null,
      descricao: this.createCategoriatForm.get('txtDescricao').value,
      idUsuario: this.idUsuario,
      idTipoCategoria: Number(this.createCategoriatForm.get('slctTipoCategoria').value)
    };

    try {
      this.categoriaService.createCategoria(categoria)
      .subscribe({
        next: (result: any ) => {
          if (result.message == true)
          {
            this.modalAlert.open(AlertComponent, "Categoria cadastrada com Sucesso.", 'Success');
            this.activeModal.close();
            setTimeout(() => {
              this.refresh();
            }, 3000);
          }
        },
        error :(error : any) =>  {
          this.modalAlert.open(AlertComponent, error.message, 'Warning');
        }
      });
    }
    catch(error){
      this.modalAlert.open(AlertComponent, error.message, 'Warning');
    }
  }

  refresh(): void {
      window.location.reload();
  }
}
