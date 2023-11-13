import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public modalAlert: AlertComponent) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 4;
  }

  onClickNovo = () => {
  }

  onClickExcluir = () =>  {
  }

  onClickCancelar = () => {
  }
}
