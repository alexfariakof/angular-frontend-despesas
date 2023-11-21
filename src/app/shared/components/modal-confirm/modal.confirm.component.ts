import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal.confirm.component.html'
})

export class ModalConfirmComponent {
  @Input() header:string = 'Mensagem';
  @Input() message:string ='';
  @Input() onClickConfirm: Function = () => { alert('Teste Modal Confirm')};

  constructor(config: NgbModalConfig, public modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any, _message: string, _confirm: Function ) {
    const modalRef = this.modalService.open(content);
    modalRef.componentInstance.message = _message;
    return modalRef;
  }

  close(){
    this.modalService.dismissAll();
  }
}
