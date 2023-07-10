import { Component, Output, EventEmitter, Input, HostListener, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RegularChartFiller } from 'src/app/shared/models/regular-chart.model';
@Component({
  selector: 'app-regular-chart',
  templateUrl: './regular-chart.component.html',
  styleUrls: ['./regular-chart.component.css']
})
export class RegularChartComponent {

  @Output() dataInformation = new EventEmitter<any>();
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  @Output() redirectData = new EventEmitter<number>();
  @Input() view: RegularChartFiller[] = []
  generate: boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      if (this.view[0]?.itemId !== undefined && this.view[0].itemId !== -1) {
        this.generate = true
      }
    }
  }


  viewInformation(id: number) {
    this.dataInformation.emit(id)
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

  page_size: number = 1;
  page_number: number = 1;

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  

  ngOnInit() {
    this.onWindowResize();
    this.view = []
    for (let index = 0; index < 9; index++) {
      this.view.push({
        itemId: -1,
        itemName: " ",
        itemCode: " ",
        itemEnfasis: " ",
        itemMessagge: " ",
        itemOne: " ",
        itemTwo: " ",
      })
    }
    console.log(this.view);
  }

  onWindowResize() {
    this.cambiarVariable();
  }

  @HostListener('window:resize')
  cambiarVariable() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 1633) {
      this.page_size = 10;
    }
    else if (screenWidth < 1633 && screenWidth >= 1314) {
      this.page_size = 9;
    }
    else if (screenWidth < 1314 && screenWidth >= 995) {
      this.page_size = 6;
    }
    else if (screenWidth < 995 && screenWidth >= 800) {
      this.page_size = 4;
    }
    else if (screenWidth < 800 && screenWidth >= 675) {
      this.page_size = 2;
    }
    else if (screenWidth < 675) {
      this.page_size = 1;
    }

  }

}
