import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel-filler.model';
import { IconChartFiller } from 'src/app/shared/models/icon-chart.model';
import { PageEvent } from '@angular/material/paginator';
import { SimpleChanges,  } from '@angular/core';

@Component({
  selector: 'app-charge-wheel',
  templateUrl: './charge-wheel.component.html',
  styleUrls: ['./charge-wheel.component.css']
})
export class ChargeWheelComponent {
  porcentajeNumerico: number[];
  colores: string[];
  @Input() view: ChargeWheelFiller[] = [];
  generate: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {

      if(Object.keys(this.view).length !== 0){
        this.generate= true
      }else{this.generate= false}
    }
  }
  
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();

  constructor() {
    this.porcentajeNumerico = [83, 55, 67,10,5,35];
    this.colores = [];
    for (let i = 0; i < this.porcentajeNumerico.length; i++) {
      const currentPorcentaje = this.porcentajeNumerico[i];
      let currentColor = "";

      if (currentPorcentaje < 16.6) {
        currentColor = "#A92020";
      } else if (currentPorcentaje < 33.2 && currentPorcentaje > 16.6) {
        currentColor = "#F8762D";
      } else if (currentPorcentaje < 49.8 && currentPorcentaje > 33.2) {
        currentColor = "#C68F02";
      } else if (currentPorcentaje < 66.4 && currentPorcentaje > 49.8) {
        currentColor = "#C1A928";
      } else if (currentPorcentaje < 83.3 && currentPorcentaje > 66.4) {
        currentColor = "#8C9F15";
      } else if (currentPorcentaje <= 100 && currentPorcentaje > 83.3) {
        currentColor = "#54A920";
      }
      this.colores.push(currentColor);
    }
  }

  openModalUpdate(item: ChargeWheelFiller) {
    this.dataToUpdate.emit(item)
  }

  deleteItem(itemID: number , itemName: string){
    this.dataToDelete.emit({itemId:itemID,itemName:itemName})
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

  }}