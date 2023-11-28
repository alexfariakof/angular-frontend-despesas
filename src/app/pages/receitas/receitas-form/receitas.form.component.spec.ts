import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasFormComponent } from './receitas-form.component';

describe('ReceitasFormComponent', () => {
  let component: ReceitasFormComponent;
  let fixture: ComponentFixture<ReceitasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceitasFormComponent]
    });
    fixture = TestBed.createComponent(ReceitasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
