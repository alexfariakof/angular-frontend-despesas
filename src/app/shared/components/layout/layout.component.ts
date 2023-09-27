import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService } from "../../services/menu.service";
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
    constructor(private router: Router, public menuService: MenuService) {
      menuService = new MenuService();
     }

    selectMenu(menu: number) {
      this.menuService.selectMenu(menu, this.router);
    }
}
