import { Component, Inject, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExtendModalSecondService } from 'src/app/shared/services/extend-modal-second.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-extend-modal',
  templateUrl: './extend-modal-form.component.html',
  styleUrls: ['./extend-modal-form.component.css']
})
export class ExtendModalFormComponent {
  private extendModalUpdateSubscription!: Subscription;
  formExtend!: UntypedFormGroup;
  extendModalForm: FormControl = {} as FormControl;
  filler: ExtendModalFiller[] = [];
  filler1: ExtendModalFiller[] = [];
  set: boolean = true;
  expandState: boolean = true;
  inc: number = 1;

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
      } else if (item.type === "display") { }
      else { this.formExtend.addControl(item.formControlName!, new FormControl(item.dataPlacer, Validators.required)); }
    })

    this.filler.forEach((item) => {
      if (item.display) {
        item.display.map((item) => {
          item.inc = this.inc;
          this.inc = this.inc + 1;
        })
      }
    })


    this.extendModalUpdateSubscription =  this.saveService.$extendModalUpdate.subscribe((res: any) => {
      if (res) {
        let name: string = res.name;
        for (let fill of this.filler) {
          if (fill.fieldName == name) {
            if (res.item === "data") {
              fill.data = res.data;
            } else if (res.item === "display") {
              res.data.inc = (fill.display?.length!) + 1
              fill.display?.push(res.data);
            }
          }
        }
      }
    });
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
    if (this.formExtend.valid) {
      this.dialogRef.close(outputData)
    } else { this.dialogRef.close() }
  }

  convertToUppercase(fill: ExtendModalFiller): void {
    fill.ngModel = fill.ngModel!.toString().toUpperCase();
  }

  openUpdate(extend: incomeData, name: string) {
    extend.title = "⇌ " + extend.title;
    const extendRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: extend })
    document.documentElement.style.setProperty("--mdc-dialog-container-color", "#131e3b");
    extendRef.afterClosed().subscribe((res) => {
      extend.title = "";
      if (res) {
        if (extend.update) { this.saveService.dataUpdateService(res, name); } else {
          this.saveService.dataSaveService(res, name)
        }
        document.documentElement.style.setProperty("--mdc-dialog-container-color", "#182034");
      }
    }
    )
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

  ngOnDestroy(){
    this.extendModalUpdateSubscription.unsubscribe();
  }

}
