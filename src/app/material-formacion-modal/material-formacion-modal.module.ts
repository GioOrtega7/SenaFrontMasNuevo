import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFormacionModalComponent } from './material-formacion-modal.component'; // Importa el componente

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [MaterialFormacionModalComponent], // Declara el componente
  exports: [MaterialFormacionModalComponent], // Exporta el componente (si necesitas usarlo fuera del módulo)
})
export class MaterialFormacionModalModule {}