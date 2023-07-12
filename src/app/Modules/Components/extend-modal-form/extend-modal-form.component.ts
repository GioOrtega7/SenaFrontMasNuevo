import { Component, Inject, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, ValidatorFn, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { UntypedFormGroup, Validators, ValidationErrors } from '@angular/forms';
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
  formExtend: UntypedFormGroup = this.formBuilder.group({
    date: this.formBuilder.array([])
  });
  filler: ExtendModalFiller[] = [];
  filler1: ExtendModalFiller[] = [];
  set: boolean = true;
  expandState: boolean = true;
  inc: number = 1;
  files: { file: any, fieldName: string }[] = []
  constructor(
    private saveService: ExtendModalSecondService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private form: FormBuilder,
    private modal: MatDialog,
    private dialogRef: MatDialogRef<ExtendModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public incomeData: incomeData,) { }

  get date() {
    return this.formExtend.controls["date"] as FormArray;
  }

  extendModalTitle: string = "Añadir";


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

    function dateStamp(nameRe: string, nameRt: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        let date: Date = new Date(control.parent?.get(nameRe)?.value)
        let date1: Date = new Date(control.parent?.get(nameRt)?.value)

        if (date1.getTime() <= date.getTime()) {
           return date ? { forbiddenName: true } : null;
        }
        return null;
      };
    }

    this.filler.forEach((item) => {
      switch (item.type) {
        case "checkbox":
          if (item.dataPlacer) {
            var checked = item.data?.filter((res) => item.dataPlacer.some((checked: any) => checked.dataId == res.dataId))
            var unchecked = item.data?.filter((res) => !item.dataPlacer.some((uncheck: any) => uncheck.dataId == res.dataId))
            checked?.forEach((control: any) => {
              this.formExtend.addControl(control.data, new FormControl(true, Validators.required))
            });
            unchecked?.forEach((control: any) => {
              this.formExtend.addControl(control.data, new FormControl(false, Validators.required))
            });
          } else {
            item.data?.forEach(control => {
              this.formExtend.addControl(control.data, new FormControl(false, Validators.required))
            });
          }
          break;

        case "display":

          break;

        case "timestamp":
          this.formExtend.addControl(item.fieldName! + '_start', new FormControl(item.dataPlacer.start, [Validators.required]));
          this.formExtend.addControl(item.fieldName! + '_end', new FormControl(item.dataPlacer.end, [Validators.required]));
          if(item.dataPlacer.end)
          this.formExtend.get(item.fieldName! + '_start')?.markAsDirty()
          if(item.dataPlacer.end)
          this.formExtend.get(item.fieldName! + '_end')?.markAsDirty()
          break;

        default:
          this.formExtend.addControl(item.formControlName!, new FormControl(item.dataPlacer, Validators.required));
          break;
      }
    });

    this.extendModalUpdateSubscription = this.saveService.$extendModalUpdate.subscribe((res: any) => {
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

  onDateChange(formControlName: string = "", control: string = "") {

    if (!this.formExtend.get(formControlName + '_start')?.pristine && !this.formExtend.get(formControlName + '_end')?.pristine) {
      switch (control) {
        case "date":
          var dateStart: Date = new Date(this.formExtend.controls[formControlName + '_start'].value)
          var dateEnd: Date = new Date(this.formExtend.controls[formControlName + '_end'].value)
          console.log(dateStart,this.formExtend.controls[formControlName + '_start'], "asdasd" );
          
          var diffHours: number = (dateEnd.getTime() - dateStart.getTime()) / (3600000 * 24);
          for (let item of this.filler) {
            if (item.fieldName == formControlName) {
              if (dateStart.getTime() >= dateEnd.getTime()) {
                item.info = "Selección inválida";
                this.formExtend.get(item.fieldName + '_end')?.setErrors({ "badstamp": true })
                this.formExtend.get(item.fieldName + '_start')?.setErrors({ "badstamp": true })
              } else {
                this.formExtend.get(item.fieldName + '_end')?.setErrors(null)
                this.formExtend.get(item.fieldName + '_start')?.setErrors(null)
                item.info = diffHours.toString() + " Días totales"
              }
            }
          }
          break;

        case "time":
          var timeStart: string = this.formExtend.controls[formControlName + '_start'].value;
          var timeEnd: string = this.formExtend.controls[formControlName + '_end'].value;
          var [startHours, startMinutes] = timeStart.split(':');
          var startDateTime: Date = new Date();
          startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
          var [endHours, endMinutes] = timeEnd.split(':');
          var endDateTime: Date = new Date();
          endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
          var diffHours: number = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
          for (let item of this.filler) {
            if (item.fieldName == formControlName) {
              if (diffHours < 1) {
                item.info = "Selección inválida";                
                this.formExtend.get(item.fieldName + '_end')?.setErrors({ "badstamp": true })
                this.formExtend.get(item.fieldName + '_start')?.setErrors({ "badstamp": true })
              } else if (diffHours >= 1 && diffHours < 60) {
                this.formExtend.get(item.fieldName + '_end')?.setErrors(null)
                this.formExtend.get(item.fieldName + '_start')?.setErrors(null)
                item.info = diffHours.toString() + " Minutos totales"
              } else {
                this.formExtend.get(item.fieldName + '_end')?.setErrors(null)
                this.formExtend.get(item.fieldName + '_start')?.setErrors(null)
                diffHours = diffHours / 60;
                item.info = diffHours.toFixed(0).toString() + " Horas y " + Math.round(Number(diffHours.toFixed(2).substring(2)) * 0.6) + " minutos"
              }

            }
          }
          break
      }
    }
  }


  onFileChangeDoc(event: Event, fieldName: string) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.files.push({ file: files[0], fieldName: fieldName })
    }
  }

  saveData() {
    var outputData: any[] = [];
    for (let item of this.filler) {
      switch (item.type) {
        case "checkbox":
          var checkbox: { value: boolean, data: string, dataId: number }[] = []
          for (let control of item.data!) {
            checkbox.push({ value: this.formExtend.controls[control.data].value, data: control.data, dataId: control.dataId })
          }
          outputData.push(checkbox)
          checkbox = []
          break;
        case "display":
          outputData.push(item.display)
          break;

        case "file":
          outputData.push(this.files.find((res) => res.fieldName == item.fieldName)?.file)
          break

        case "timestamp":
          outputData.push({ start: this.formExtend?.controls[item.fieldName! + '_start']?.value, end: this.formExtend.get(item.fieldName! + '_end')?.value })
          break


        default:
          outputData.push(this.formExtend.controls[item.formControlName!].value)
          break

      }
    }

    if (this.formExtend.valid) {
      console.log(outputData);
      
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

  ngOnDestroy() {
    this.extendModalUpdateSubscription.unsubscribe();
  }

}