import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  constructor(private router: Router, public menuService: MenuService) {

  }

  selectMenu(menu: number) {
    this.menuService.selectMenu(menu, this.router);
  }
}
