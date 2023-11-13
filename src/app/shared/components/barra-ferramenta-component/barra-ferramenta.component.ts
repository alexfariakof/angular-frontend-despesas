import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-ferramenta',
  templateUrl: './barra-ferramenta.component.html',
  styleUrls: ['./barra-ferramenta.component.scss']
})

export class BarraFerramentaComponent  {
  @Input() onClickNovo: Function;
  @Input() onClickExcluir: Function;
  @Input() onClickCancelar: Function;
  @Input() btnNovo: boolean;
  @Input() btnExcluir?: boolean;
  @Input() btnCancelar?: boolean;

  clickBtnNovo() {
    if (this.onClickNovo) {
      this.onClickNovo();
    }
  }

  clickBtnExcluir() {
    if (this.onClickExcluir) {
      this.onClickExcluir();
    }
  }

  clickBtnCancelar() {
    if (this.onClickCancelar) {
      this.onClickCancelar();
    }
  }

  clickBtnVoltar(){
    window.history.back();
  }

}
