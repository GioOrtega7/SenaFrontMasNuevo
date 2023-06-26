import { Component,Output,Input,EventEmitter,SimpleChanges,Inject } from '@angular/core';
import { BoardTable } from 'src/app/shared/models/board-table.model';
import { BoardTableFiller } from 'src/app/shared/models/board-table.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFiler } from 'src/app/shared/models/board-table.model';


@Component({
  selector: 'app-table-extend-information',
  templateUrl: './table-extend-information.component.html',
  styleUrls: ['./table-extend-information.component.css']
})
export class TableExtendInformationComponent {
  generate: boolean = false
  view1:Date[]=[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public incomeData: DateFiler) { }

  extendModalTitle: string = "Información de";
}
