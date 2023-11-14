import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';

@Component({
  selector: 'app-categorias.form',
  templateUrl: './categorias.form.component.html',
  styleUrls: ['./categorias.form.component.scss']
})


export class CategoriasFormComponent implements OnInit {
  createCategoriatForm : FormGroup;

  constructor(public formbuilder: FormBuilder, public modalALert: AlertComponent, public activeModal:NgbActiveModal) { }

  ngOnInit(): void{
    this.createCategoriatForm = this.formbuilder.group({
    })
  }


  onSaveClick = () => {
    this.modalALert.open(AlertComponent, 'Teste Modal Alert In Moadl Form', 'Warning');
  }



}
