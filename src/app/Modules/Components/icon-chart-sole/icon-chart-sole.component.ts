import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { IconChart } from 'src/app/shared/models/icon-chart.model';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-icon-chart-sole',
  templateUrl: './icon-chart-sole.component.html',
  styleUrls: ['./icon-chart-sole.component.css']
})
export class IconChartSoleComponent {

  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  generate!: boolean

  constructor(private modal: MatDialog,){

  }

  @Input() view: IconChart = {} as IconChart


  openModalUpdate(item: IconChart) {
    this.dataToUpdate.emit(item)
  }

  deleteItem(itemID: number , itemName: string){
    this.dataToDelete.emit({itemId:itemID,itemName:itemName})
  }

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      // Realiza las acciones que deseas cuando haya un cambio en la variable de entrada
      if(Object.keys(this.view as IconChart).length !== 0){
        this.generate= true
      }
    }
  }

}
