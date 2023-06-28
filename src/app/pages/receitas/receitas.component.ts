import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 4;
  }

}
