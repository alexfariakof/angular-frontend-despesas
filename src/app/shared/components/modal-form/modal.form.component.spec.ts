import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './modal.form.component';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormComponent],
      providers: [NgbModalConfig, NgbModal ],
    });

    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {

    const content = ['<div></div>'];
    spyOn(component.modalService, 'open');
    component.open(content);
    expect(component.modalService.open).toHaveBeenCalled();
    expect(component.modalService.open).toHaveBeenCalledWith(content, { centered: true });
  });

  it('should close modal', () => {
    spyOn(component.modalService, 'dismissAll');

    component.close();

    expect(component.modalService.dismissAll).toHaveBeenCalled();
  });
});
