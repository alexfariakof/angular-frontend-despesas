import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BarraFerramentaClass } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.abstract';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements BarraFerramentaClass {
  dtOptions: DataTables.Settings = {};

  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 3;
  }

  onClickNovo = () => {
  }

}
