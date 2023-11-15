import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { BarChartComponent } from 'src/app/shared/components/bar-chart/bar-chart.component';


const routes: Routes = [{
    path: '',
    component: CategoriasComponent,
  }];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class CategoriaRoutingModule{}
