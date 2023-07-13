import { Component, Output, EventEmitter, Input, SimpleChanges, HostListener } from '@angular/core';
import { SimpleChartFiller } from 'src/app/shared/models/simple-chart.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-simple-chart-sole',
  templateUrl: './simple-chart-sole.component.html',
  styleUrls: ['./simple-chart-sole.component.css']
})

export class SimpleChartSoleComponent {

  @Output() dataToUpdate = new EventEmitter<number>();
  @Output() dataToDelete = new EventEmitter<{ itemId: number, itemName: string }>();
  @Output() redirectData = new EventEmitter<number>();
  @Output() dataInformation = new EventEmitter<number>();

  @Input() view!: SimpleChartFiller
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

  deleteItem(itemID: number, itemName: string) {
    this.dataToDelete.emit({ itemId: itemID, itemName: itemName })
  }

  redirect(id: number) {
    this.redirectData.emit(id)
  }

  viewInformation(id: number) {
    this.dataInformation.emit(id)
  }



  ngOnInit() {
    if(this.view == undefined || this.view == {} as SimpleChartFiller || !Object(this.view).keys)
    this.view = {
      itemId: -1,
      itemName: " ",
      itemOne: "  ",
      itemTwo: "  ",
    }
  }

}
