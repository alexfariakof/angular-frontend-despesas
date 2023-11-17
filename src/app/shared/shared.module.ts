import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CategoriasdModule } from './../pages/categorias/categorias.module';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { BarraFerramentaModule } from './components/barra-ferramenta-component/barra-ferramenta.component.module';
import { BarraFerramentaComponent } from './components/barra-ferramenta-component/barra-ferramenta.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableModule } from './components/data-table/data-table.component.module';
@NgModule({
  declarations: [LayoutComponent ],
  exports: [LayoutComponent, BarraFerramentaComponent, DataTableModule],
  imports: [CommonModule, FormsModule, BarraFerramentaModule ],
  providers: [DataTableComponent]
 })
export class SharedModule { }
