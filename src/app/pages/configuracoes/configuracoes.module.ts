import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracoesComponent } from './configuracoes.component';

@NgModule({
  providers: [],
  declarations: [ConfiguracoesComponent ],
  imports: [CommonModule, ConfiguracoesModule]  
})
export class ConfiguracoesModule {}