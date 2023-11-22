import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { CategoriaRoutingModule } from './categorias.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoriaService } from 'src/app/shared/services/api/categorias/categoria.service';
import { CategoriasFormComponent } from './categorias-form/categorias.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import RefreshService from 'src/app/shared/services/utils/refersh-service/refresh.service';
@NgModule({
    declarations: [CategoriasComponent, CategoriasFormComponent ],
    imports: [CommonModule, ReactiveFormsModule, CategoriaRoutingModule, SharedModule],
    providers: [CategoriaService, RefreshService]
})

export class CategoriasModule {}
