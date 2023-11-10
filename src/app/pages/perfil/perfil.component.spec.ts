import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../shared/services/menu-service/menu.service';
import { PerfilRoutingModule } from './perfil-routing.module';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [
        CommonModule,
        PerfilRoutingModule,
        FormsModule],
      providers: [MenuService]
    });
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
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

  it('should create the PerfilRoutingModule', () => {
    const routingModule: PerfilRoutingModule = TestBed.inject(PerfilRoutingModule);
    expect(routingModule).toBeTruthy();
  });
});
