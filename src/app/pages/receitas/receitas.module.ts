import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasComponent } from './receitas.component';
import { ReceitasRoutingModule } from './receitas-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ReceitasComponent ],
  imports: [CommonModule, ReceitasRoutingModule, SharedModule]
})
export class ReceitasModule {}
