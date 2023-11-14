import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  providers: [],
  declarations: [PerfilComponent ],
  imports: [ CommonModule, FormsModule, PerfilRoutingModule ]
})
export class PerfilModule {}
