import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesasFormComponent } from './despesas.form.component';

describe('DespesasFormComponent', () => {
  let component: DespesasFormComponent;
  let fixture: ComponentFixture<DespesasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasFormComponent]
    });
    fixture = TestBed.createComponent(DespesasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
