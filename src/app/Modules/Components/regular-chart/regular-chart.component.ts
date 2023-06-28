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


  

  @Input() view: RegularChartFiller[] = []
  generate:boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      console.log(this.view.length);
      
      if(Object.keys(this.view).length !== 0){
        this.generate= true
        console.log(this.view);
        
      }else{this.generate= false}
    }
  }


  viewInformation(id:number){
    this.dataInformation.emit(id)
  }
  openModalUpdate(id : number) {
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
