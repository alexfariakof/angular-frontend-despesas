import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasComponent } from './receitas.component';
import { ReceitasRoutingModule } from './receitas.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReceitasFormComponent } from './receitas-form/receitas.form.component';
@NgModule({
  declarations: [ReceitasComponent, ReceitasFormComponent ],
  imports: [CommonModule, ReceitasRoutingModule, ReactiveFormsModule, SharedModule, MatIconModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule]
})
export class ReceitasModule {}
