import { Router } from "@angular/router";
export class MenuService {
    constructor() {
    }

    menuSelecionado: number = 0;

    selectMenu(menu: number, router : Router) {
      switch (menu) {
          case 0:
            router.navigate(['/login']);
            break;

          case 1:
              router.navigate(['/dashboard']);
              break;

          case 2:
              router.navigate(['/categoria']);
              break;

          case 3:
              router.navigate(['/despesa']);
              break;

          case 4:
              router.navigate(['/receita']);
              break;

          case 5:
              router.navigate(['/lancamento']);
              break;

          case 6:
              router.navigate(['/perfil']);
              break;

          case 7:
              router.navigate(['/configuracoes']);
              break;

          default:
              router.navigate(['/dashboard']);
              break;
      }

      this.menuSelecionado = menu;
  }
}
