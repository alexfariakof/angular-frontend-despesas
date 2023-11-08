import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarningAlertComponent } from './warning-alert.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WarningAlertModule } from './warning-alert.component.module';
import { MockAlertComponent } from 'src/app/__mock__/mock-component/mock-alert.component';

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
    // Assert
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    // Arrange
    const content = MockAlertComponent;
    spyOn(modalService, 'open').and.returnValue(modalService.open(content));

    // Act
    component.open(content);

    // Assert
    expect(modalService.open).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(content);
  });


  it('should close modal', () => {
    // Arrange
    const content = MockAlertComponent;
    spyOn(modalService, 'open').and.returnValue(modalService.open(content));
    spyOn(modalService, 'dismissAll').and.returnValue(modalService.dismissAll());

    // Act
    component.close();

    // Assert
    expect(modalService.dismissAll).toHaveBeenCalled();
  });


  it('should open WarningAlertComponent and message been seted', () => {
    // Arrange
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const expectedMessage = 'Teste Mensaagem';
    const openSpy = spyOn(component, 'open').and.returnValue(modalRefMock);

    // Act
    modalRefMock.componentInstance.message = expectedMessage;
    component.open(MockAlertComponent);

    // Assert
    expect(openSpy).toHaveBeenCalledWith(MockAlertComponent);
    expect(modalRefMock.componentInstance.message).toBe(expectedMessage);
  });

  it('should open and close', () => {
    // Arrange
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const openSpy = spyOn(component, 'open').and.returnValue(modalRefMock);
    const closeSpy = spyOn(component, 'close').and.returnValue(modalRefMock);

    // Act
    component.open(MockAlertComponent);
    component.close();

    // Assert
    expect(openSpy).toHaveBeenCalledWith(MockAlertComponent);
    expect(closeSpy).toHaveBeenCalledWith();
  });
});
