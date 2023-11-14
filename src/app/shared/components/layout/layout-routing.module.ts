import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'categoria', redirectTo: 'categoria' },
  { path: 'despesa', redirectTo: 'despesa' },
  { path: 'receita', redirectTo: 'receita' },
  { path: 'lancamento', redirectTo: 'lancamento' },
  { path: 'perfil', redirectTo: 'perfil' },
  { path: 'configuracoes', redirectTo: 'configuracoes'}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule{}
