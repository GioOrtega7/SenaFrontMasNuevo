import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { toArray } from 'rxjs';
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

}
