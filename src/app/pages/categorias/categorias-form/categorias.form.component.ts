import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { ITipoCategoria } from 'src/app/shared/interfaces/ITipoCategoria';
@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias.form.component.html',
  styleUrls: ['./categorias.form.component.scss']
})

export class CategoriasFormComponent implements OnInit {
  createCategoriatForm: FormGroup = this.formbuilder.group({ });
  tipoCategoria: ITipoCategoria = ITipoCategoria.Despesas ;
  descricao: String;

  constructor(public formbuilder: FormBuilder, public modalALert: AlertComponent, public activeModal:NgbActiveModal) { }

  ngOnInit(): void{
    this.createCategoriatForm = this.formbuilder.group({ });
  }

  onSaveClick = () => {
    this.modalALert.open(AlertComponent, 'Operação não implementada.', 'Warning');
  }

}
