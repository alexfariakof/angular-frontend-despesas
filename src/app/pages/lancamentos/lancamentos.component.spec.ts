import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentosComponent } from './lancamentos.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('LancamentosComponent', () => {
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentosComponent],
      imports: [CommonModule, LancamentosRoutingModule, SharedModule],
      providers: [MenuService, AlertComponent, NgbActiveModal ]
    });
    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
