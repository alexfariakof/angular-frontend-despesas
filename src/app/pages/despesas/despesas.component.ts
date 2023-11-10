import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 3;
  }

}
