import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasRoutingModule } from './despesas.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DespesasComponent } from './despesas.component';
import { DespesasFormComponent } from './despesas-form/despesas.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
@NgModule({
  declarations: [DespesasComponent, DespesasFormComponent ],
  imports: [CommonModule, DespesasRoutingModule, ReactiveFormsModule, MdbFormsModule, SharedModule]
})
export class DespesasModule {}
