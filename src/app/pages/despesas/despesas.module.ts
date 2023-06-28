import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasComponent } from './despesas.component';
import { DespesasRoutingModule } from './despesas-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  providers: [],
  declarations: [DespesasComponent ],
  imports: [CommonModule, DespesasRoutingModule, SharedModule]  
})
export class DespesasModule {}
