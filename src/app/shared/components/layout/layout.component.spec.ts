import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { MenuService } from '../../services/menu.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;
  let menuService: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports:[
        CommonModule,
        LayoutRoutingModule,
        RouterTestingModule
    ],
    providers: [MenuService]
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    menuService = TestBed.inject(MenuService);
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
});
