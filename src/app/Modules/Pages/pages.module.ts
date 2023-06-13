import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoFormativoComponent } from './proyecto-formativo/proyecto-formativo.component';
import { AreasComponent } from './areas/areas.component';



@NgModule({
  declarations: [
    ProyectoFormativoComponent,
    AreasComponent
  ],
  imports: [
    CommonModule
  ]
  , exports:[ 
    AreasComponent
  ]
})
export class PagesModule { }
