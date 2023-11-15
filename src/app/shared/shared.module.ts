import { BarraFerramentaModule } from './components/barra-ferramenta-component/barra-ferramenta.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { BarraFerramentaComponent } from './components/barra-ferramenta-component/barra-ferramenta.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableModule } from './components/data-table/data-table.component.module';

@NgModule({
  providers: [DataTableComponent],
  declarations: [LayoutComponent ],
  exports: [LayoutComponent, BarraFerramentaComponent, DataTableModule],
  imports: [CommonModule, BarraFerramentaModule ]
})
export class SharedModule { }
