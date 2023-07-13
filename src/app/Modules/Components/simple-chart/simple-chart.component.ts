import { Component, Output, EventEmitter, Input, SimpleChanges, HostListener } from '@angular/core';
import { SimpleChartFiller } from 'src/app/shared/models/simple-chart.model';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css']
})
export class SimpleChartComponent {
  @Output() dataToUpdate = new EventEmitter<number>();
  @Output() dataToDelete = new EventEmitter<{ itemId: number, itemName: string }>();
  @Output() redirectData = new EventEmitter<number>();
  @Output() dataInformation = new EventEmitter<number>();

  @Input() view: SimpleChartFiller[] = []
  generate: boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if (this.view[0]?.itemId !== undefined && this.view[0].itemId !== -1) {
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

  redirect(id: number){
    this.redirectData.emit(id)
  }

  viewInformation(id: number) {
    this.dataInformation.emit(id)
  }

  
  page_size: number = 1;
  page_number: number = 1;

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

 

  ngOnInit() {
    this.cambiarVariable()
    if(this.view.length<1)
    for (let index = 0; index < 15; index++) {
      this.view.push({
        itemId: -1,
        itemName: " ",
        itemOne: "  ",
        itemTwo: "  ",
      })
    }

  }

  onWindowResize() {
    this.cambiarVariable();
  }

  @HostListener('window:resize')
  cambiarVariable() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth >= 1540) {
      this.page_size = 12;
    }
    else if (screenWidth < 1540 && screenWidth >= 1314) {
      this.page_size = 10;
    }
    else if (screenWidth < 1314 && screenWidth >= 1030) {
      this.page_size = 8;
    }
    else if (screenWidth < 1030 && screenWidth >= 800) {
      this.page_size = 6;
    }
    else if (screenWidth < 800 && screenWidth >= 675) {
      this.page_size = 4;
    }
    else if (screenWidth < 675) {
      this.page_size = 1;
    }

  }

}
