import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadChildren: () => import('../../../pages/dashboard/dashboard.module').then(m => m.DashboardModule), },
  { path: 'categoria', loadChildren: () => import('../../../pages/categorias/categorias.module').then(m => m.CategoriasdModule), },
  { path: 'despesa', loadChildren: () => import('../../../pages/despesas/despesas.module').then(m => m.DespesasModule), },
  { path: 'receita', loadChildren: () => import('../../../pages/receitas/receitas.module').then(m => m.ReceitasModule), },
  { path: 'lancamento', loadChildren: () => import('../../../pages/lancamentos/lancamentos.module').then(m => m.LancamentosModule),},
  { path: 'perfil', loadChildren: () => import('../../../pages/perfil/perfil.module').then(m => m.PerfilModule)},
  { path: 'configuracoes', loadChildren: () => import('../../../pages/lancamentos/lancamentos.module').then(m => m.LancamentosModule)}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule{}
