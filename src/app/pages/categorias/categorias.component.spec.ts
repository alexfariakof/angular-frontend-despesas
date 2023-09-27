import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasComponent } from './categorias.component';
import { CategoriaRoutingModule } from './categorias-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu.service';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasComponent],
      imports: [CommonModule, CategoriaRoutingModule, SharedModule],
      providers: [MenuService]
    });
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
