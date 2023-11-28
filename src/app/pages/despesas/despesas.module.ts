import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "src/app/shared/shared.module";
import { DespesasFormComponent } from "./despesas-form/despesas.form.component";
import { DespesasComponent } from "./despesas.component";
import { DespesasRoutingModule } from "./despesas.routing.module";
@NgModule({
  declarations: [DespesasComponent, DespesasFormComponent ],
  imports: [CommonModule, DespesasRoutingModule, ReactiveFormsModule, SharedModule, MatIconModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule],
})
export class DespesasModule {}
