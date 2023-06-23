import { Component, Output, EventEmitter, Input, HostListener, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-regular-chart',
  templateUrl: './regular-chart.component.html',
  styleUrls: ['./regular-chart.component.css']
})
export class RegularChartComponent {

  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();


  

  @Input() view: RegularChartComponent[] = []
  generate:boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if(Object.keys(this.view).length !== 0){
        this.generate= true
      }else{this.generate= false}
    }
  }


  openModalUpdate() {
    let item
    this.dataToUpdate.emit(item)
  }

  deleteItem(itemID: number, itemName: string) {
    this.dataToDelete.emit({ itemId: itemID, itemName: itemName })
  }

  page_size: number = 1;
  page_number: number = 1;

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  @HostListener('window:resize')

  ngOnInit() {
    this.cambiarVariable()
  }

  onWindowResize() {
    this.cambiarVariable();
  }
  cambiarVariable() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 1633) {
      this.page_size = 10;
    }
    else if (screenWidth < 1633 && screenWidth >= 1314) {
      this.page_size = 8;
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
