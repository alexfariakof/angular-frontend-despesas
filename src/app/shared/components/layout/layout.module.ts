import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

@NgModule(
    {
        providers:[],
        declarations:[LayoutComponent],
        imports:[
            CommonModule,
            LayoutComponent
        ]
    }
)

export class LayoutModule{}