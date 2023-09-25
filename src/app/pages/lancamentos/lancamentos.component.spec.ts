import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosComponent } from './lancamentos.component';
import { CategoriaRoutingModule } from '../categorias/categorias-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LancamentosComponent', () => {
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentosComponent],
      imports: [CommonModule, CategoriaRoutingModule, SharedModule]
    });
    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
