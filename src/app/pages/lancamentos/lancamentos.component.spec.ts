import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertComponent } from "src/app/shared/components";
import { AuthService, MenuService } from "src/app/shared/services";
import { SharedModule } from "src/app/shared/shared.module";
import { LancamentosComponent } from "./lancamentos.component";

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
