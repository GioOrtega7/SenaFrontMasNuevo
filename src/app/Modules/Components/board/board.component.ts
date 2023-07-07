import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Board } from 'src/app/shared/models/board.model';

interface board{
  titulos:string;
  datos:string;
  id:number;
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {


  @Input() view: Board  = {} as Board 
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  generate: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      if (Object.keys(this.view).length !== 0) {
        this.generate = true
      } else { this.generate = false }
    }
  }
  
  openModalUpdate(id: number) {
    this.dataToUpdate.emit(id)
  }

  deleteItem(itemID: number, itemName: string = "este elemento") {
    this.dataToDelete.emit({ itemId: itemID, itemName: itemName })
  }

}
