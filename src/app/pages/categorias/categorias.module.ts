import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { CategoriaRoutingModule } from './categorias.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
@NgModule({
    declarations: [CategoriasComponent, CategoriasFormComponent ],
    imports: [CommonModule, ReactiveFormsModule,MdbFormsModule, CategoriaRoutingModule, SharedModule],
    providers: [CategoriaService]
})

export class CategoriasModule {}
