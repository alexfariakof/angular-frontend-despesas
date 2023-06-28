import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';

@NgModule({
  providers: [],
  declarations: [PerfilComponent ],
  imports: [CommonModule, PerfilModule]  
})
export class PerfilModule {}