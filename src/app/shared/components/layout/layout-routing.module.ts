import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'perfil', loadChildren: () => import('../../../pages/perfil/perfil.module').then(m => m.PerfilModule)},
  { path: 'configuracoes', loadChildren: () => import('../../../pages/lancamentos/lancamentos.module').then(m => m.LancamentosModule)}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule{}
