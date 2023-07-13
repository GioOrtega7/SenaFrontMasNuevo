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
  @Output() redirectData = new EventEmitter<number>();
  generate: boolean = false
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      if (this.view?.itemId !== undefined && this.view.itemId !== -1) {
        this.generate = true
      } else { this.generate = false }
    }
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

  redirect(id: number){
    this.redirectData.emit(id)
  }

  ngOnInit() {
    if(this.view == undefined || this.view === {} as IconChartFiller || !Object(this.view).keys)
      this.view = {
      itemId: -1,
      iconUrl: "https://cdn.icon-icons.com/icons2/2570/PNG/512/image_icon_153794.png",
      itemName: "  ",
      itemCode: "  ",
      itemOne: "  ",
      itemTwo: "  ",
      itemThree: "  "
    }}
  
}
