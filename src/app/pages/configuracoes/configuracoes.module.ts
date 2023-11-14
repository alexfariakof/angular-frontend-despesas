import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracoesComponent } from './configuracoes.component';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
@NgModule({
  providers: [],
  declarations: [ConfiguracoesComponent ],
  imports: [CommonModule, ConfiguracoesRoutingModule]
})
export class ConfiguracoesModule {}
