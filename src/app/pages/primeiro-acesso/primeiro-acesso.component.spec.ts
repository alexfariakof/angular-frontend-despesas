import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeiroAcessoComponent } from './primeiro-acesso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrimeiroAcessoComponent', () => {
  let component: PrimeiroAcessoComponent;
  let fixture: ComponentFixture<PrimeiroAcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeiroAcessoComponent],
      imports: [ReactiveFormsModule, NgbModalModule,  RouterTestingModule],
    });
    fixture = TestBed.createComponent(PrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
