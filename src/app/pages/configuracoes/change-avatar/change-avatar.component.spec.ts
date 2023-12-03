import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvatarComponent } from './change-avatar.component';

describe('ChangeAvatarComponent', () => {
  let component: ChangeAvatarComponent;
  let fixture: ComponentFixture<ChangeAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAvatarComponent]
    });
    fixture = TestBed.createComponent(ChangeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
