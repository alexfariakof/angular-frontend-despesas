import { Component, Input } from '@angular/core';
import { BarraFerramentaClass } from './barra-ferramenta.abstract';
import { FilterMesAnoService } from '../../services';
@Component({
  selector: 'app-barra-ferramenta',
  templateUrl: './barra-ferramenta.component.html',
  styleUrls: ['./barra-ferramenta.component.scss']
})

export class BarraFerramentaComponent implements BarraFerramentaClass{
  @Input() onClickNovo: Function = () => {};
  @Input() btnNovo: boolean =  false;
  @Input() dtMesAno: boolean = false;

  onChangeDataMesAno: Function = () => { };
  setOnChangeDataMesAno = (onChange: Function) => {
    this.onChangeDataMesAno = onChange;
  }

  constructor(public filterMesAnoService: FilterMesAnoService) {}

  clickBtnNovo = () => {
    if (this.onClickNovo) {
      this.onClickNovo();
    }
  }

  clickBtnVoltar = () => {
    window.history.back();
  }
}
