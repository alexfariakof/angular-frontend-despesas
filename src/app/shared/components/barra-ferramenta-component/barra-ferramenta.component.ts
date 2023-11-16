import { Component, Input } from '@angular/core';
import { BarraFerramentaClass } from './barra-ferramenta.abstract';
@Component({
  selector: 'app-barra-ferramenta',
  templateUrl: './barra-ferramenta.component.html',
  styleUrls: ['./barra-ferramenta.component.scss']
})

export class BarraFerramentaComponent implements BarraFerramentaClass{
  @Input() onClickNovo: Function = () => {};
  @Input() btnNovo: boolean =  false;

  clickBtnNovo() {
    if (this.onClickNovo) {
      this.onClickNovo();
    }
  }

  clickBtnVoltar(){
    window.history.back();
  }

}
