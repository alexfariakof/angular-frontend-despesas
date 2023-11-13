import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosComponent } from './lancamentos.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LancamentosComponent ],
  imports: [CommonModule, LancamentosRoutingModule, SharedModule]
})
export class LancamentosModule {}
