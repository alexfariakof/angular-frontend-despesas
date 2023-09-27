import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasComponent } from './receitas.component';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from '../categorias/categorias-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu.service';

describe('ReceitasComponent', () => {
  let component: ReceitasComponent;
  let fixture: ComponentFixture<ReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceitasComponent],
      imports: [CommonModule, CategoriaRoutingModule, SharedModule],
      providers: [MenuService]
    });
    fixture = TestBed.createComponent(ReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
