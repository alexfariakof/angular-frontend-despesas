import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { MenuService } from 'src/app/shared/services/utils/menu-service/menu.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
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
