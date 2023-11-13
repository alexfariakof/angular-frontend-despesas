import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesasComponent } from './despesas.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DespesasRoutingModule } from './despesas-routing.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('DespesasComponent', () => {
  let component: DespesasComponent;
  let fixture: ComponentFixture<DespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasComponent],
      imports: [CommonModule, DespesasRoutingModule, RouterTestingModule, SharedModule],
      providers: [MenuService, NgbActiveModal]
    });
    fixture = TestBed.createComponent(DespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
