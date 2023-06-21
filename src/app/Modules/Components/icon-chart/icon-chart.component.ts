import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { IconChart } from 'src/app/shared/models/icon-chart.model';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-icon-chart',
  templateUrl: './icon-chart.component.html',
  styleUrls: ['./icon-chart.component.css']
})
export class IconChartComponent {

  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  filler: any

  constructor(private modal: MatDialog,){}

  @Input() view: IconChart[] = [] 


  openModalUpdate(item: IconChart) {
    this.dataToUpdate.emit(item)
  }

  deleteItem(itemID: number , itemName: string){
    this.dataToDelete.emit({itemId:itemID,itemName:itemName})
  }

  page_size: number = 8;
  page_number: number = 1;

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.cambiarVariable(); 
  }
  cambiarVariable() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 1592 ) {
      this.page_size = 8;
    }
    else if (screenWidth < 1592 && screenWidth >= 1203 ){
      this.page_size = 6;
    }
    else if (screenWidth < 1203 && screenWidth >= 814) {
      this.page_size = 4;
    }
    else if (screenWidth < 814 && screenWidth >= 814 ) {
      this.page_size = 2;
    }
    else if (screenWidth < 814 && screenWidth >= 600 ) {
      this.page_size = 2;
    }
    else if (screenWidth < 600) {
      this.page_size = 1;
    }

  }

}
