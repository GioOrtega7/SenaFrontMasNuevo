import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { IconChartFiller } from 'src/app/shared/models/icon-chart.model';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-icon-chart',
  templateUrl: './icon-chart.component.html',
  styleUrls: ['./icon-chart.component.css']
})
export class IconChartComponent {
  @Output() dataInformation = new EventEmitter<any>();
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();


  constructor(private modal: MatDialog,) { }

  @Input() view: IconChartFiller[] = []
  generate:boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if(Object.keys(this.view).length !== 0){
        this.generate= true
      }else{this.generate= false}
    }
  }
  viewInformation(id:number){
    this.dataInformation.emit(id)
  }
  openModalUpdate(item: IconChartFiller) {
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
