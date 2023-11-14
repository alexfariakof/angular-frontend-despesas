import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasRoutingModule } from './despesas-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DespesasComponent } from './despesas.component';
@NgModule({
  declarations: [DespesasComponent ],
  imports: [CommonModule, DespesasRoutingModule, SharedModule]
})
export class DespesasModule {}
