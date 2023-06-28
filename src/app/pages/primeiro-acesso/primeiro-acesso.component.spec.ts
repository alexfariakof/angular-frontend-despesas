import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeiroAcessoComponent } from './primeiro-acesso.component';

describe('PrimeiroAcessoComponent', () => {
  let component: PrimeiroAcessoComponent;
  let fixture: ComponentFixture<PrimeiroAcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeiroAcessoComponent]
    });
    fixture = TestBed.createComponent(PrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
