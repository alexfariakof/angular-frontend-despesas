import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfilComponent } from './perfil.component';
@NgModule({
  declarations: [PerfilComponent],
  imports: [ CommonModule, PerfilRoutingModule, SharedModule ]
})
export class PerfilModule {}
