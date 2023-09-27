import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {
  constructor(private router: Router, public menuService: MenuService) {

  }

  selectMenu(menu: number) {
    this.menuService.selectMenu(menu, this.router);
  }

}
