import { Component, NgModule } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { ComponentsPipe } from '../components.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AreasTryComponent } from './areas-try/areas-try.component';
import { GruposViewComponent } from './grupos-view/grupos-view.component';



@NgModule({
  declarations: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,
    AreasComponent,
    AreasModalComponent,
    AreasTryComponent,
    GruposViewComponent,


  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ComponentsModule,

  ]
  , exports: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,


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
