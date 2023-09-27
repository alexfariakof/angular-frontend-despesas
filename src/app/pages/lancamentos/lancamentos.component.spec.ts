import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentosComponent } from './lancamentos.component';
import { CategoriaRoutingModule } from '../categorias/categorias-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu.service';

describe('LancamentosComponent', () => {
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentosComponent],
      imports: [CommonModule, CategoriaRoutingModule, SharedModule],
      providers: [MenuService]
    });
    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
