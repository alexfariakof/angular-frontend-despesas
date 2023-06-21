import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasComponent } from './receitas.component';

describe('ReceitasComponent', () => {
  let component: ReceitasComponent;
  let fixture: ComponentFixture<ReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceitasComponent]
    });
    fixture = TestBed.createComponent(ReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
