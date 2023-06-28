import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  providers: [],
  declarations: [PerfilComponent ],
  imports: [
    CommonModule, 
    PerfilModule, 
    FormsModule]  
})
export class PerfilModule {}