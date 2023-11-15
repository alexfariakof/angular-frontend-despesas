import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { CategoriaRoutingModule } from './categorias.routing.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [CategoriasComponent ],
  imports: [CommonModule, CategoriaRoutingModule, SharedModule],
})

export class CategoriasdModule {}
