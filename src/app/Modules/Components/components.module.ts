import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesRoutingModule } from './components-routing.module';
import { ChargeWheelComponent } from './charge-wheel/charge-wheel.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { ProgramaFormativoComponent } from './programa-formativo/programa-formativo.component';
import { ExtendModalComponent } from './extend-modal/extend-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent,
    ExtendModalComponent
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    ReactiveFormsModule

  ],
  exports: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent
  ]
})
export class ComponentsModule { }
