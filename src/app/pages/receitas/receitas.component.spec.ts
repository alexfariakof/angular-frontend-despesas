import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceitasComponent } from './receitas.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { ReceitasRoutingModule } from './receitas-routing.module';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ReceitasComponent', () => {
  let component: ReceitasComponent;
  let fixture: ComponentFixture<ReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceitasComponent],
      imports: [CommonModule, ReceitasRoutingModule, SharedModule],
      providers: [MenuService, AlertComponent, NgbActiveModal]
    });
    fixture = TestBed.createComponent(ReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
