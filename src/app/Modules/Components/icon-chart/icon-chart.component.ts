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
  @Output() dataInformation = new EventEmitter<number>();
  @Output() dataToUpdate = new EventEmitter<number>();
  @Output() dataToDelete = new EventEmitter<{ itemId: number, itemName: string }>();
  @Output() redirectData = new EventEmitter<number>();


  constructor(private modal: MatDialog,) { }

  @Input() view: IconChartFiller[] = []
  generate: boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if (this.view[0]?.itemId !== undefined && this.view[0].itemId !== -1) {
        this.generate = true
      } else { this.generate = false }
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
    this.cambiarVariable()
    this.view = []
    for (let index = 0; index < 9; index++) {
      this.view.push({
        itemId: -1,
        iconUrl: "https://cdn.icon-icons.com/icons2/2570/PNG/512/image_icon_153794.png",
        itemName: "  ",
        itemCode: "  ",
        itemOne: "  ",
        itemTwo: "  ",
        itemThree: "  "
      })
    }

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
