import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentosComponent } from './lancamentos.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { AlertComponent } from 'src/app/shared/components/alert-component/alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('LancamentosComponent', () => {
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockAuthService.isAuthenticated.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [LancamentosComponent],
      imports: [CommonModule,  SharedModule],
      providers: [MenuService, AlertComponent, NgbActiveModal,
        { provide: AuthService, useValue: mockAuthService }, ]
    });
    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});
