import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarningAlertComponent } from './warning-alert.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WarningAlertModule } from './warning-alert.component.module';

describe('WarningAlertComponent', () => {
  let component: WarningAlertComponent;
  let fixture: ComponentFixture<WarningAlertComponent>;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningAlertComponent],
      imports: [ WarningAlertModule],
      providers: [NgbModalConfig, NgbModal],

    });
    fixture = TestBed.createComponent(WarningAlertComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    // Arrange
    spyOn(component, 'open');

    // Act
    component.open(['content']);

    // Assert
    expect(component.open).toHaveBeenCalled();
  });

  it('should close modal', () => {
    // Arrange
    spyOn(component, 'close');

    // Act
    component.close();

    // Assert
    expect(component.close).toHaveBeenCalled();
  });

  it('should open WarningAlertComponent and message been seted', () => {
    // Arrange
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const expectedMessage = 'Teste Mensaagem';
    const openSpy = spyOn(component, 'open').and.returnValue(modalRefMock);

    // Act
    modalRefMock.componentInstance.message = expectedMessage;
    component.open(WarningAlertComponent);

    // Assert
    expect(openSpy).toHaveBeenCalledWith(WarningAlertComponent);
    expect(modalRefMock.componentInstance.message).toBe(expectedMessage);
  });

  it('should open and close', () => {
    // Arrange
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const openSpy = spyOn(component, 'open').and.returnValue(modalRefMock);
    const closeSpy = spyOn(component, 'close').and.returnValue(modalRefMock);

    // Act
    component.open(WarningAlertComponent);
    component.close();

    // Assert
    expect(openSpy).toHaveBeenCalledWith(WarningAlertComponent);
    expect(closeSpy).toHaveBeenCalledWith();
  });
});
