import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessAlertComponent } from './success-alert.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SuccessAlertModule } from './success-alert.component.module';

describe('SuccessAlertComponent', () => {
  let component: SuccessAlertComponent;
  let fixture: ComponentFixture<SuccessAlertComponent>;
  let modalService: NgbModal;
  let modalServiceMock: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessAlertComponent],
      imports: [ SuccessAlertModule],
      providers: [NgbModalConfig,  { provide: NgbModal, useValue: modalServiceMock } ],
    });

    fixture = TestBed.createComponent(SuccessAlertComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal); // Obtenha uma instância do serviço NgbModal
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    // Act
    component.open(['content']);

    // Assert
    expect(component).toHaveBeenCalledWith(['content']);
  });

  it('should close modal', () => {
    // Act
    component.close();

    // Assert
    expect(component.close).toHaveBeenCalled();
  });

  it('should open SuccessAlertComponent and message been seted', () => {
    // Arrange
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const expectedMessage = 'Teste Mensaagem';
    const openSpy = spyOn(component, 'open').and.returnValue(modalRefMock);

    // Act
    modalRefMock.componentInstance.message = expectedMessage;
    component.open(SuccessAlertComponent);

    // Assert
    expect(openSpy).toHaveBeenCalledWith(SuccessAlertComponent);
    expect(modalRefMock.componentInstance.message).toBe(expectedMessage);
  });

  it('should open and close', () => {
    // Arrange
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    const openSpy = spyOn(component, 'open').and.returnValue(modalRefMock);
    const closeSpy = spyOn(component, 'close').and.returnValue(modalRefMock);

    // Act
    component.open(SuccessAlertComponent);
    component.close();

    // Assert
    expect(openSpy).toHaveBeenCalledWith(SuccessAlertComponent);
    expect(closeSpy).toHaveBeenCalledWith();
  });

});
