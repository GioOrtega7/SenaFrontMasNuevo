import { Component,Output,Input,EventEmitter,SimpleChanges,Inject, ViewChild, ElementRef } from '@angular/core';
import { BoardTable } from 'src/app/shared/models/board-table.model';
import { BoardTableFiller } from 'src/app/shared/models/board-table.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFiler } from 'src/app/shared/models/board-table.model';
import { __values } from 'tslib';


@Component({
  selector: 'app-table-extend-information',
  templateUrl: './table-extend-information.component.html',
  styleUrls: ['./table-extend-information.component.css']
})
export class TableExtendInformationComponent {
  @ViewChild('relaciones')relaciones! : ElementRef;
  info:any [] = []
  object:any [] = []
  generate: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public incomeData: any) { 
    }
  extendModalTitle: string = "Información de";
  isValueObject(value:any):boolean {
    if (typeof value === 'object' && value !== null) {
      this.object = value;
      return true;
    }
    return typeof value === 'object' && value !== null ;
  }
  isValueArray(value: any): boolean {
    if (Array.isArray(value)) {
      this.info = value
    }
    return Array.isArray(value);
  }
  getObjectEntries(obj: any): any[] {
    return Object.entries(obj);

  }  
extras(index: number) {
  const elementos = this.relaciones.nativeElement;
  console.log(elementos)
  const elemento = elementos[index];
  elemento.classList.add('relaciones');
}

close(index: number) {
  const elementos = this.relaciones.nativeElement;
  const elemento = elementos[index];
  elemento.classList.remove('relaciones');
}
}
