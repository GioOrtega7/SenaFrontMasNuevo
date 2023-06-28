import { Component, Input, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { toArray } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BoardTableFiller, BoardTable } from 'src/app/shared/models/board-table.model';

@Component({
  selector: 'app-board-table',
  templateUrl: './board-table.component.html',
  styleUrls: ['./board-table.component.css']
})
export class BoardTableComponent {

  @Input() view: BoardTable = {} as BoardTable
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  generate: boolean = false
  viewData:BoardTableFiller[] = []
  viewTitles:Array<string> = []


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if (Object.keys(this.view).length !== 0) {
        this.viewData = this.view.itemData
        this.viewTitles = this.view.itemTitles 
        this.viewTitles.push("Acciones")
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
      this.page_size = 8;
    }
    else if (screenWidth < 995 && screenWidth >= 800) {
      this.page_size = 8;
    }
    else if (screenWidth < 800 && screenWidth >= 675) {
      this.page_size = 8;
    }
    else if (screenWidth < 675) {
      this.page_size = 8;
    }

  }
}
