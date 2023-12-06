import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoComponent } from './saldo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SaldoComponent', () => {
  let component: SaldoComponent;
  let fixture: ComponentFixture<SaldoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SaldoComponent, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
