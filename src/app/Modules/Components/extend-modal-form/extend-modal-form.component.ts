import { ExpressionStatement } from '@angular/compiler';
import { Component, NgModule, Inject } from '@angular/core';
import { FormControl, NgForm, FormBuilder, FormsModule, AbstractControl, NgModel } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';


@Component({
  selector: 'app-extend-modal',
  templateUrl: './extend-modal-form.component.html',
  styleUrls: ['./extend-modal-form.component.css']
})
export class ExtendModalFormComponent {
  formExtend!: UntypedFormGroup;
  extendModalForm: FormControl = {} as FormControl;
  filler: ExtendModalFiller[] = [];
  filler1: ExtendModalFiller[] = [];
  itemFlag: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ExtendModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public incomeData: incomeData,) { }


  extendModalTitle: string = "Añadir";

  get nombreProyectoField() {
    return this.formExtend.get('nombre');
  }


  isFormComplete = true;
  ngOnInit() {
    this.filler1 = this.incomeData.filler;
    this.extendModalTitle = this.incomeData.title || "title";
    this.filler = this.filler1.map(item => ({
      fieldName: item.fieldName || "",
      placeholder: item.placeholder || "Ingrese " + item.fieldName,
      uppercase: item.uppercase || false,
      type: item.type || "input",
      control: item.control || "text",
      formControlName: "fcont_" + item.fieldName || "",
      ngModel: item.dataPlacer,
      UPCondition: item.uppercase || false,
      data: item.data || [{ data: "string", dataId: 2 }],
      dataPlacer: item.dataPlacer || null
    }));

    if (this.incomeData.update) {
      this.filler.forEach(element => {

      });
    }


    this.formExtend = this.formBuilder.group({})
    this.filler.forEach((item) => {
      this.formExtend.addControl(item.formControlName!, new FormControl('', Validators.required));
    });
  }

  private getControl(name: string) {
    return this.formExtend.controls[name];
  }

  saveData() {

    if (!this.incomeData.incomeId) {
      let outputData = this.filler.map(item => {
        return this.getControl(item.formControlName || "value").value
      })
      this.dialogRef.close(outputData);
    }
  }

  convertToUppercase(fill: ExtendModalFiller): void {
    fill.ngModel = fill.ngModel!.toUpperCase();
  }



  isSelected(dataplacer: string = "", id: number = 0): boolean {
    if (dataplacer.toString() == id.toString()) {
      console.log("sapo malparido", dataplacer, id);
      return true
    }
    else { console.log("sapo perro"); return false }
  }


  openUpdate(data: any[]){

  }



}
