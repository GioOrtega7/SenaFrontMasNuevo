import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { MaterialFormacion } from '../shared/models/material-formacion.model';
import { MaterialFormacionService } from '../shared/services/material-formacion.service';




@Component({
  selector: 'app-material-formacion-modal',
  templateUrl: './material-formacion-modal.component.html',
  styleUrls: ['./material-formacion-modal.component.css'],
})



export class MaterialFormacionModalComponent {
/*   formMaterialFormacion: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MaterialFormacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public materialFormacion: MaterialFormacion,
    private formBuilder: FormBuilder,
    private materialFormacionService: MaterialFormacionService
  ) {
    this.formMaterialFormacion = this.formBuilder.group({}); // Inicialización vacía del FormGroup
    this.buildForm();
  }

  get codigoField() {
    return this.formMaterialFormacion.get('codigoMF');
  }

  get descripcionField() {
    return this.formMaterialFormacion.get('descripcion');
  }

  private setMaterialFormacion() {
    if (this.materialFormacion) {
      this.formMaterialFormacion.patchValue({
        codigoMF: this.materialFormacion.codigoMF,
        descripcion: this.materialFormacion.descripcion,
      });
    }
  }

  private buildForm() {
    this.formMaterialFormacion = this.formBuilder.group({
      id: [0],
      codigoMF: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.formMaterialFormacion.valueChanges
      .pipe(debounceTime(350))
      .subscribe((data) => {});
  }

  guardarMaterialFormacion() {
    const materialFormacion = this.getMaterialFormacion();

    if (materialFormacion.id) {
      this.materialFormacionService
        .actualizarMaterialFormacion(materialFormacion)
        .subscribe(() => {
          this.dialogRef.close(true); // Indicar que la operación fue exitosa y cerrar el modal
        });
    } else {
      this.materialFormacionService
        .crearMaterialFormacion(materialFormacion)
        .subscribe(() => {
          this.dialogRef.close(true); // Indicar que la operación fue exitosa y cerrar el modal
        });
    }
  }

  private getMaterialFormacion(): MaterialFormacion {
    return {
      id: this.materialFormacion?.id || 0,
      codigoMF: this.codigoField?.value || '', // Usamos ? para acceder al valor solo si this.codigoField no es null
      descripcion: this.descripcionField?.value || '', // Usamos ? para acceder al valor solo si this.descripcionField no es null
      rutaarchivo: '', // Puedes ajustar esta propiedad según tus necesidades
      
      //idAA: null, // Puedes ajustar esta propiedad según tus necesidades
    };
  } */
}
