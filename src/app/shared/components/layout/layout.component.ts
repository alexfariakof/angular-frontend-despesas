import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService } from "../../services/menu-service/menu.service";
import { AuthService } from "../../services/auth/auth.service";
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
    constructor(private authService: AuthService, private router: Router, public menuService: MenuService) { }

    selectMenu(menu: number) {
      this.menuService.selectMenu(menu, this.router);
    }


    onLogoutClick(){
      this.authService.clearLocalStorage();
      this.router.navigate(['/']);
    }

}
