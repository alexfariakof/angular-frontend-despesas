import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService } from "../../services/utils/menu-service/menu.service";
import { AuthService } from "../../services/auth/auth.service";
import { ImagemPerfilService } from "../../services/api";
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  urlPerfilImage: string = '../../../../assets/perfil_static.png';
  constructor(
    private authService: AuthService,
    private router: Router,
    public menuService: MenuService,
    private imagemPerfilService: ImagemPerfilService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = (): void => {
    this.imagemPerfilService.getImagemPerfilUsuarioByIdUsuario()
      .subscribe({
        next: (response: any) => {
          if (response.message === true && response.imagemPerfilUsuario !== undefined && response.imagemPerfilUsuario !== null) {
            this.urlPerfilImage = response.imagemPerfilUsuario.url;
          }
        },
        error: () => {
          this.urlPerfilImage = '../../../../assets/perfil_static.png';
        }
      });
  }

  selectMenu(menu: number) {
    this.menuService.selectMenu(menu, this.router);
  }

  onLogoutClick() {
    this.authService.clearLocalStorage();
    this.router.navigate(['/']);
  }
}
