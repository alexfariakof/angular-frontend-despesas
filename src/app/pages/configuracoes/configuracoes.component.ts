import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { BarraFerramentaModule } from 'src/app/shared/components/barra-ferramenta-component/barra-ferramenta.component.module';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  imports: [BarraFerramentaModule]
})
export class ConfiguracoesComponent  {
  constructor(
    public router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public modalAlert: AlertComponent)  {
  }

  selectMenu(menu: number) {
    this.menuService.selectMenu(menu, this.router);
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 7;
  }

  onLogoutClick(){
    this.router.navigate(['/']);
  }
}
