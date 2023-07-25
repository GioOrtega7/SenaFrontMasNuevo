import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasComponent } from './areas-view/areas/areas.component';
import { ComponentsModule } from '../Components/components.module';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink } from '@angular/router';
import { SubirArchivosComponent } from './subir-archivos/subir-archivos.component';

@NgModule({
  declarations: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,
    AreasComponent,
    AreasModalComponent,
    AreasTryComponent,
    GruposViewComponent,
    DashboardComponent,
    SubirArchivosComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ]
  , exports: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,
    AreasComponent,
    AreasModalComponent,
    AreasTryComponent,
    GruposViewComponent,
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
