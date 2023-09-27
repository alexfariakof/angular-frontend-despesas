import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesasComponent } from './despesas.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaRoutingModule } from '../categorias/categorias-routing.module';
import { MenuService } from 'src/app/shared/services/menu.service';

describe('DespesasComponent', () => {
  let component: DespesasComponent;
  let fixture: ComponentFixture<DespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasComponent],
      imports: [CommonModule, CategoriaRoutingModule, SharedModule],
      providers: [MenuService]
    });
    fixture = TestBed.createComponent(DespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
