import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { RegularChartFiller } from 'src/app/shared/models/regular-chart.model';

@Component({
  selector: 'app-regular-chart-sole',
  templateUrl: './regular-chart-sole.component.html',
  styleUrls: ['./regular-chart-sole.component.css']
})
export class RegularChartSoleComponent {

  @Output() dataInformation = new EventEmitter<any>();
  @Input() view: RegularChartFiller = {} as RegularChartFiller
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  generate: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      if (this.view?.itemId !== undefined && this.view.itemId !== -1) {
        this.generate = true
      } else { this.generate = false }
    }
  }

  ngOnInit() {
   if(!this.view)
    this.view = {
      itemId: -1,
      itemName: " ",
      itemCode: " ",
      itemEnfasis: " ",
      itemMessagge: " ",
      itemOne: " ",
      itemTwo: " ",
 
    }
  }
  openModalUpdate(id: number) {
    this.dataToUpdate.emit(id)
  }

  deleteItem(itemID: number, itemName: string = "este elemento") {
    this.dataToDelete.emit({ itemId: itemID, itemName: itemName })
  }

  viewInformation(id: number) {
    this.dataInformation.emit(id)
  }
}
