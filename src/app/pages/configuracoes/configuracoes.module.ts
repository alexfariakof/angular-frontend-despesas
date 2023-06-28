import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracoesComponent } from './configuracoes.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  providers: [],
  declarations: [ConfiguracoesComponent ],
  imports: [CommonModule, ConfiguracoesModule, SharedModule]  
})
export class ConfiguracoesModule {}