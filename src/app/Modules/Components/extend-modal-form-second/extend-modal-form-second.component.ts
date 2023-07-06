import { Component, Inject, ElementRef } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExtendModalSecondService } from 'src/app/shared/services/extend-modal-second.service';



@Component({
  selector: 'app-extend-modal-form-second',
  templateUrl: './extend-modal-form-second.component.html',
  styleUrls: ['./extend-modal-form-second.component.css']
})
export class ExtendModalFormSecondComponent {
  formExtend!: UntypedFormGroup;
  extendModalForm: FormControl = {} as FormControl;
  filler: ExtendModalFiller[] = [];
  filler1: ExtendModalFiller[] = [];
  set: boolean = true;
  expandState: boolean = true;
  inc: number = 1;

  constructor(
    private saveService: ExtendModalSecondService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ExtendModalFormSecondComponent>,
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
      data: item.data || [{ data: "data", dataId: 0 }],
      dataPlacer: item.dataPlacer || "",
      extend: item.extend || undefined,
      display: item.display
    }));

    this.formExtend = this.formBuilder.group({})

    this.filler.forEach((item) => {
      if (item.type === "checkbox") {
        if (item.dataPlacer) {
          var checked = item.data?.filter((res) => item.dataPlacer.some((checked: any) => checked.dataId == res.dataId))
          var unchecked = item.data?.filter((res) => !item.dataPlacer.some((uncheck: any) => uncheck.dataId == res.dataId))
          checked!.forEach((control: any) => {
            this.formExtend.addControl(control.data, new FormControl(true, Validators.required))
          });
          unchecked!.forEach((control: any) => {
            this.formExtend.addControl(control.data, new FormControl(false, Validators.required))
          });
        } else { item.data?.forEach(control => { this.formExtend.addControl(control.data, new FormControl(false, Validators.required)) }) }
      } else { this.formExtend.addControl(item.formControlName!, new FormControl(item.dataPlacer, Validators.required)); }
    })

    this.filler.forEach((item) => {
      if (item.display) {
        item.display.map((res) => {
          res.inc = item.display?.length || 0
        })
      }
    })
  }

  private getControl(name: string) {
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
      } else
        if (item.type === "display") { outputData.push(item.display) }
        else { outputData.push(this.formExtend.controls[item.formControlName!].value) }
    }

    this.dialogRef.close(outputData)
  }

  convertToUppercase(fill: ExtendModalFiller): void {
    fill.ngModel = fill.ngModel!.toString().toUpperCase();
  }

  selectAll(data: { data: string, dataId: number }[]) {
    for (let item of data) {
      this.formExtend.get(item.data)?.setValue(this.set)
    }
    this.set = !this.set
  }

  toggleClass() {
    this.expandState = !this.expandState
  }

  deleteItem(inc: number, name: string) {
    this.filler.forEach(res => {
      if (res.display && res.fieldName == name) {
        res.display = res.display.filter(res => (res.inc !== inc))
      }
    });
  }
}
