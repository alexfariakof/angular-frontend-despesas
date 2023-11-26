import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasRoutingModule } from './despesas.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DespesasComponent } from './despesas.component';
import { DespesasFormComponent } from './despesas-form/despesas.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [DespesasComponent, DespesasFormComponent ],
  imports: [CommonModule, DespesasRoutingModule, ReactiveFormsModule, SharedModule, MatIconModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule],
})
export class DespesasModule {}
