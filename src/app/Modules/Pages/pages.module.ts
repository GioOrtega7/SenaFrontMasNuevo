import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasComponent } from './areas-view/areas/areas.component';
import { ChargeWheelComponent } from '../Components/charge-wheel/charge-wheel.component';
import { ComponentsModule } from '../Components/components.module';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoFormativoModalComponent } from './proyecto-formativo-view/proyecto-formativo-modal/proyecto-formativo-modal.component';
import { ProyectoFormativoComponent } from './proyecto-formativo-view/proyecto-formativo/proyecto-formativo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AreasModalComponent } from './areas-view/areas-modal/areas-modal.component';



@NgModule({
  declarations: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,
    AreasModalComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
  , exports: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent
  ],
  providers: [
    { 
    provide: MatDialogRef,
    useValue: []
     }, 
    { 
    provide: MAT_DIALOG_DATA, 
    useValue: [] 
    }
    ]
})
export class PagesModule { }
