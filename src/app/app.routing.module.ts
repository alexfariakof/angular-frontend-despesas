import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: "createAccount", component: PrimeiroAcessoComponent},
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), },
  { path: 'categoria', loadChildren: () => import('./pages/categorias/categorias.module').then(m => m.CategoriasdModule), },
  { path: 'despesa', loadChildren: () => import('./pages/despesas/despesas.module').then(m => m.DespesasModule), },
  { path: 'receita', loadChildren: () => import('./pages/receitas/receitas.module').then(m => m.ReceitasModule), },
  { path: 'lancamento', loadChildren: () => import('./pages/lancamentos/lancamentos.module').then(m => m.LancamentosModule),},
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule), },
  { path: 'configuracoes', loadChildren: () => import('./pages/configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
