import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentosComponent } from './lancamentos.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu.service';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

describe('LancamentosComponent', () => {
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentosComponent],
      imports: [CommonModule, LancamentosRoutingModule, SharedModule],
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
