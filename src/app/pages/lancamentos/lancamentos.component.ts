import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { BarraFerramentaClass, AlertComponent } from "src/app/shared/components";
import { MenuService } from "src/app/shared/services";
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
