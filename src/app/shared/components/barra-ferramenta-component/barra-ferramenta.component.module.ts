import { NgModule } from '@angular/core';
import { BarraFerramentaComponent } from './barra-ferramenta.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [BarraFerramentaComponent],
  exports: [BarraFerramentaComponent],
  imports: [CommonModule ]
})
export class BarraFerramentaModule { }
