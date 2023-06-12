import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesRoutingModule } from './components-routing.module';
import { ChargeWheelComponent } from './charge-wheel/charge-wheel.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { ProgramaFormativoComponent } from './programa-formativo/programa-formativo.component';


@NgModule({
  declarations: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,

  ],
  exports: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent
  ]
})
export class ComponentsModule { }
