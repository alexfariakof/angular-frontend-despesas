import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFerramentaComponent } from './barra-ferramenta.component';

describe('BarraFerramentaComponent', () => {
  let component: BarraFerramentaComponent;
  let fixture: ComponentFixture<BarraFerramentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraFerramentaComponent]
    });
    fixture = TestBed.createComponent(BarraFerramentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
