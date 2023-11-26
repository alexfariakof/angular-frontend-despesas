import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { BarraFerramentaModule } from './components/barra-ferramenta-component/barra-ferramenta.component.module';
import { BarraFerramentaComponent } from './components/barra-ferramenta-component/barra-ferramenta.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSelectModule } from '@angular/material/select';
import { DataTableModule } from './components/data-table/data-table.component.module';

@NgModule({
  declarations: [LayoutComponent ],
  imports: [CommonModule, FormsModule, BarraFerramentaModule, CurrencyMaskModule ],
  exports: [LayoutComponent, BarraFerramentaComponent, DataTableModule, CurrencyMaskModule, MatSelectModule],
  providers: [DataTableComponent]
 })

export class SharedModule { }
