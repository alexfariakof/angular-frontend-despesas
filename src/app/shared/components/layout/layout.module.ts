import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule(
    {
        providers:[],
        declarations:[LayoutComponent],
        imports:[
            CommonModule,
            LayoutRoutingModule,
            LayoutComponent
        ]
    }
)

export class LayoutModule{}