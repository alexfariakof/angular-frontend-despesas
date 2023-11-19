import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasFormComponent } from './categorias.form.component';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('CategoriasFormComponent', () => {
  let component: CategoriasFormComponent;
  let fixture: ComponentFixture<CategoriasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasFormComponent],
      imports: [ReactiveFormsModule ],
      providers: [AlertComponent, NgbActiveModal, FormBuilder]
    });
    fixture = TestBed.createComponent(CategoriasFormComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component).toBeTruthy();
  });
});
