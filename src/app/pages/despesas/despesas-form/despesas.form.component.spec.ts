import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesasFormComponent } from './despesas.form.component';
import { DespesaService } from 'src/app/shared/services/api/despesas/despesa.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';

describe('Unit Test DespesasFormComponent', () => {
  let component: DespesasFormComponent;
  let fixture: ComponentFixture<DespesasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MdbFormsModule ],
      providers: [FormBuilder, AlertComponent, NgbActiveModal, DespesaService]
    });
    fixture = TestBed.createComponent(DespesasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
