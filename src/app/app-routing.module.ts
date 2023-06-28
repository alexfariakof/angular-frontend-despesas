import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'login' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), }, 
  { path: 'categoria', loadChildren: () => import('./pages/categorias/categorias.module').then(m => m.CategoriasdModule), },
  { path: 'despesa', loadChildren: () => import('./pages/despesas/despesas.module').then(m => m.DespesasModule), },
  { path: 'receita', loadChildren: () => import('./pages/receitas/receitas.module').then(m => m.ReceitasModule), },
  { path: 'lancamento', loadChildren: () => import('./pages/lancamentos/lancamentos.module').then(m => m.LancamentosModule),},
  { path: 'perfil', component: PerfilComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
