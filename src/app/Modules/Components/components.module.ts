import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesRoutingModule } from './components-routing.module';
import { ChargeWheelComponent } from './charge-wheel/charge-wheel.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { ProgramaFormativoComponent } from './programa-formativo/programa-formativo.component';
import { ExtendModalFormComponent } from './extend-modal-form/extend-modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { IconChartComponent } from './icon-chart/icon-chart.component';
import { ExtendModalAlertComponent } from './extend-modal-alert/extend-modal-alert.component';
import { ComponentsPipe } from '../components.pipe';
import { IconChartSoleComponent } from './icon-chart-sole/icon-chart-sole.component';


@NgModule({
  declarations: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent,
    ExtendModalFormComponent,
    IconChartComponent,
    ExtendModalAlertComponent,
    IconChartComponent,
    ComponentsPipe,
    IconChartSoleComponent,
    
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule

  ],
  exports: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent,
    ExtendModalFormComponent,
    IconChartComponent,
    IconChartSoleComponent
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
export class ComponentsModule { }
