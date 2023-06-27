import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

@NgModule(
    {
        providers:[],
        declarations:[LayoutComponent],
        imports:[
            NgModule,
            CommonModule,
            LayoutComponent
        ]
    }
)

export class LayoutModule{}