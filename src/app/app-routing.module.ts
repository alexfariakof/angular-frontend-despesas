import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { ReceitasComponent } from './pages/receitas/receitas.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'categoria', component: CategoriasComponent }, 
  { path: 'despesa', component: DespesasComponent }, 
  { path: 'receita', component: ReceitasComponent }, 
  { path: 'lancamento', component: LancamentosComponent }, 
  { path: 'logout', component: LoginComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
