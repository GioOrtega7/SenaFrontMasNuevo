import { Component, NgModule, Inject, ElementRef } from '@angular/core';
import { FormControl, NgForm, FormBuilder, FormsModule, AbstractControl, NgModel } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';
import { ExtendModalSecondService } from 'src/app/shared/services/extend-modal-second.service';



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
  set: boolean = true

  constructor(
    private saveService: ExtendModalSecondService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private modal: MatDialog,
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
      data: item.data || [{ data: "string", dataId: 0 }],
      dataPlacer: item.dataPlacer || null,
      extend: item.extend || undefined
    }));

    this.formExtend = this.formBuilder.group({})
    /*this.filler.forEach((item) => {
      this.formExtend.addControl(item.formControlName!, new FormControl('', Validators.required));
    });*/

    this.filler.forEach((item) => {
      if (item.type === "checkbox") {
        for (let control of item.data!) {
          if (item.dataPlacer) {
            for (let dataPlace of item.dataPlacer) {
              if (dataPlace.dataId == control.dataId) {
                this.formExtend.addControl(control.data, new FormControl(true, Validators.required))
              } else { this.formExtend.addControl(control.data, new FormControl(false, Validators.required)) }
            }
          } else { this.formExtend.addControl(control.data, new FormControl(false, Validators.required)) }
        }
      } else { this.formExtend.addControl(item.formControlName!, new FormControl('', Validators.required)); }
    })

    this.saveService.$extendModalUpdate.subscribe((res:any) => {
      if (res) { 
        let name: string = res.name; let data: any[] = res.data
        console.log("asdqwe", data, name);
        
        for(let fill of this.filler){
          if (fill.fieldName == name){
            fill.data = data
          }
        }
      }
    }
    )
  }

  private getControl(name: string) {
    console.log(this.formExtend.controls[name]);

    return this.formExtend.controls[name];
  }

  saveData() {

    var outputData: any[] = [];

    for (let item of this.filler) {

      if (item.type === "checkbox") {
        var checkbox: { value: boolean, data: string, dataId: number }[] = []
        for (let control of item.data!) {
          checkbox.push({ value: this.formExtend.controls[control.data].value, data: control.data, dataId: control.dataId })
        }
        outputData.push(checkbox)
        checkbox = []
      } else { outputData.push(this.formExtend.controls[item.formControlName!].value) }

    }
    console.log("asda", outputData);
    this.dialogRef.close(outputData)

  }

  convertToUppercase(fill: ExtendModalFiller): void {

    fill.ngModel = fill.ngModel!.toString().toUpperCase();


  }

  openUpdate(extend: incomeData, name: string) {
    extend.title = "⇌ " + extend.title;
    const extendRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: extend })
    document.documentElement.style.setProperty("--mdc-dialog-container-color", "#131e3b");
    extendRef.afterClosed().subscribe((res) => {
      console.log("xd", res)
      this.saveService.dataSave(res, name)
      document.documentElement.style.setProperty("--mdc-dialog-container-color", "#182034");
    }
    )


  }

  selectAll(data: { data: string, dataId: number }[]) {

    for (let item of data) {
      this.formExtend.get(item.data)?.setValue(this.set)
    }
    this.set = !this.set
  }



}
