import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';


const routes: Routes = [{
    path: '',
    component: PerfilComponent,
  },
  { path: 'perfil', loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilModule), },
  { path: 'configuracoes', loadChildren: () => import('../configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),}
];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class PerfilRoutingModule{}