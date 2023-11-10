import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
  }

}
