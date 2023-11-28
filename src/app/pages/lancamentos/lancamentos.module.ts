import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { LancamentosComponent } from "./lancamentos.component";
import { LancamentosRoutingModule } from "./lancamentos.routing.module";
@NgModule({
  declarations: [LancamentosComponent ],
  imports: [CommonModule, LancamentosRoutingModule, SharedModule]
})
export class LancamentosModule {}
