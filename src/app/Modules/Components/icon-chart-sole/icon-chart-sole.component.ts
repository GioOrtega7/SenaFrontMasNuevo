import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { IconChartFiller } from 'src/app/shared/models/icon-chart.model';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-icon-chart-sole',
  templateUrl: './icon-chart-sole.component.html',
  styleUrls: ['./icon-chart-sole.component.css']
})
export class IconChartSoleComponent {
  @Input() view: IconChartFiller = {} as IconChartFiller
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  @Output() dataInformation = new EventEmitter<any>();
  generate!: boolean

  constructor(private modal: MatDialog,){

  }

  


  openModalUpdate(id: number) {
    this.dataToUpdate.emit(id)
  }

  deleteItem(itemID: number , itemName: string){
    this.dataToDelete.emit({itemId:itemID,itemName:itemName})
  }

  viewInformation(itemID:number){
    this.dataInformation.emit(itemID)
  }

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if(Object.keys(this.view).length !== 0){
        this.generate= true
      }else{this.generate= false}
    }
  }

}
