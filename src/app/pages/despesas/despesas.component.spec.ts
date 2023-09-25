import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasComponent } from './despesas.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaRoutingModule } from '../categorias/categorias-routing.module';

describe('DespesasComponent', () => {
  let component: DespesasComponent;
  let fixture: ComponentFixture<DespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasComponent],
      imports: [CommonModule, CategoriaRoutingModule, SharedModule]
    });
    fixture = TestBed.createComponent(DespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
