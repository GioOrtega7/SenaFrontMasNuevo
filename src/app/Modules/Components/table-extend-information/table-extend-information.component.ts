import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-table-extend-information',
  templateUrl: './table-extend-information.component.html',
  styleUrls: ['./table-extend-information.component.css']
})
export class TableExtendInformationComponent {
  @ViewChild('relaciones') relaciones!: ElementRef;
  info: any[] = []
  object: any[] = []
  generate: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public incomeData:{data: object, title:string}) {
  }
  extendModalTitle: string = "Información de";
  isValueObject(value: any): boolean {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      this.object = value;
      return true;
    }
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
  isValueArray(value: any): boolean {
    if (Array.isArray(value) &&  value.length > 0) {
      this.info = value
    }
    return Array.isArray(value) &&  value.length > 0;
  }
  getObjectEntries(obj: any): any[] {
    return Object.entries(obj);

  }
  extras(index: number) {
    const elemento = this.relaciones.nativeElement.querySelector('.herencias'+index );
    elemento.classList.add('relaciones');
 
  }
  close(index: number) {
    const elemento = this.relaciones.nativeElement.querySelector('.herencias'+index );
    elemento.classList.remove('relaciones');
  }
}
