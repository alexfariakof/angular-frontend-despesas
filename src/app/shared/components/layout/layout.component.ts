import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService } from "../../services/menu.service";
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
    constructor(private router: Router, public menuService: MenuService) { }

    selectMenu(menu: number) {
        switch (menu) {
            case 1:
                this.router.navigate(['/dashboard']);
                break;

            case 2:
                this.router.navigate(['/categoria']);
                break;

            case 3:
                this.router.navigate(['/despesa']);
                break;

            case 4:
                this.router.navigate(['/receita']);
                break;

            case 5:
                this.router.navigate(['/lancamento']);
                break;

            case 6:
                this.router.navigate(['/perfil']);
                break;

            case 7:
                this.router.navigate(['/configuracoes']);
                break;

            default:
                break;
        }

        this.menuService.menuSelecionado = menu;
    }
}
