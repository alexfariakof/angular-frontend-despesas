import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 5;
  }

}
