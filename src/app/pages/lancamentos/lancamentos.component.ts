import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';
@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})

export class LancamentosComponent implements  BarraFerramentaClass {
  dtOptions: DataTables.Settings = {};

  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public modalAlert: AlertComponent) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 5;
  }

  onClickNovo = () => {
  }

}
