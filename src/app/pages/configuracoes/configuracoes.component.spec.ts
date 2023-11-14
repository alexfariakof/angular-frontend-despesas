import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestBed } from '@angular/core/testing';
import { ConfiguracoesComponent } from './configuracoes.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';

describe('Unit Test ConfiguracoesComponent', () => {
  let component: ConfiguracoesComponent;
  let router: Router;
  let menuService: MenuService;
  let formBuilder: FormBuilder;
  let modalAlert: AlertComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, ReactiveFormsModule],
      providers: [MenuService, ConfiguracoesRoutingModule, AlertComponent, NgbActiveModal]
    });

    router = TestBed.inject(Router);
    menuService = TestBed.inject(MenuService);
    formBuilder = TestBed.inject(FormBuilder);
    modalAlert = TestBed.inject(AlertComponent);
    component = new ConfiguracoesComponent(router, menuService, formBuilder, modalAlert);
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard when menu is 1', () => {
    spyOn(router, 'navigate');
    component.selectMenu(1);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
   });

  it('should navigate to categoria when menu is 2', () => {
    spyOn(router, 'navigate');
    component.selectMenu(2);
    expect(router.navigate).toHaveBeenCalledWith(['/categoria']);
  });

  it('should navigate to despesa when menu is 3', () => {
    spyOn(router, 'navigate');
    component.selectMenu(3);
    expect(router.navigate).toHaveBeenCalledWith(['/despesa']);
  });

  it('should navigate to receita when menu is 4', () => {
    spyOn(router, 'navigate');
    component.selectMenu(4);
    expect(router.navigate).toHaveBeenCalledWith(['/receita']);
  });

  it('should navigate to lancamento when menu is 5', () => {
    spyOn(router, 'navigate');
    component.selectMenu(5);
    expect(router.navigate).toHaveBeenCalledWith(['/lancamento']);
  });

  it('should navigate to perfil when menu is 6', () => {
    spyOn(router, 'navigate');
    component.selectMenu(6);
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });

  it('should navigate to configuracoes when menu is 7', () => {
    spyOn(router, 'navigate');
    component.selectMenu(7);
    expect(router.navigate).toHaveBeenCalledWith(['/configuracoes']);
  });

  it('should navigate to Dashboard when an invalid menu is selected', () => {
    spyOn(router, 'navigate');
    component.selectMenu(8); // Valor fora do intervalo válido
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should create the ConfiguracoesRoutingModule', () => {
    const routingModule: ConfiguracoesRoutingModule = TestBed.inject(ConfiguracoesRoutingModule);
    expect(routingModule).toBeTruthy();
  });

  it('should logout', () => {
    spyOn(router, 'navigate');
    component.onLogoutClick();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});
