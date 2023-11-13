import { BarraFerramentaModule } from './components/barra-ferramenta-component/barra-ferramenta.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { BarraFerramentaComponent } from './components/barra-ferramenta-component/barra-ferramenta.component';
import { CategoriasFormComponent } from '../pages/categorias/categorias-form/categorias.form.component';

@NgModule({
  declarations: [LayoutComponent ],
  exports: [LayoutComponent, BarraFerramentaComponent],
  imports: [CommonModule, BarraFerramentaModule]
})
export class SharedModule { }
