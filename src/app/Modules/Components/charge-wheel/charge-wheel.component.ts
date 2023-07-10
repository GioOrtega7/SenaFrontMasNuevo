import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel.model';
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
  fechaActual:Date;
  @Input() view: ChargeWheelFiller[] = [];
  @Output() dataInformation = new EventEmitter<any>();
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  generate: boolean = false;
  porsentajeDias:number[]=[]; 
  fechainicio:Date[]=[];
  FechaActual = new Date();
  fechafin:Date[]=[]
  constructor() {
    this.fechaActual = new Date();
    this.porcentajeNumerico = [100, 100, 100,100,100,100];
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
  public getCalculatedIndex(index: number): number {
    const calculatedIndex = index + (this.page_size * (this.page_number - 1));
    return calculatedIndex;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      if(this.view[0]?.itemId !== undefined && this.view[0].itemId !== -1){
        for (let i = 0; i < this.view.length; i++) {
          const { itemFechafin,itemFechainicio } = this.view[i];
          const totalDias = (new Date(itemFechafin).getTime() - new Date(itemFechainicio).getTime()) / (1000 * 3600 * 24);
          const diasTranscurridos = (this.fechaActual.getTime() - new Date(itemFechainicio).getTime()) / (1000 * 3600 * 24);
          const porcentaje = (diasTranscurridos / totalDias) * 100;
          const porcentajedias = Math.round(porcentaje);
          this.view[i].itemPercentaje = porcentajedias 
        }
        this.generate= true
      }else{this.generate= false}
    }
  }


  viewInformation(id:number){
    this.dataInformation.emit(id)
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
    this.view = []
    for (let index = 0; index < 9; index++) {
      this.view.push({
        itemId: -1,
        itemName: "  ",
        itemCode: "  ",
        itemOne: "  ",
        itemTwo: "  ",
        itemThree: "  ",
        itemFechafin: new Date(2023, 6, 9),
        itemFechainicio: new Date(2023, 6, 9),
        itemPercentaje: 0
      })
    }
  }

  onWindowResize() {
    this.cambiarVariable();
  }
  cambiarVariable() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 1633) {
      this.page_size = 10;
    }
    else if (screenWidth < 1633 && screenWidth >= 1245) {
      this.page_size = 8;
    }
    else if (screenWidth < 1245 && screenWidth >= 945) {
      this.page_size = 6;
    }
    else if (screenWidth < 945 && screenWidth >= 800) {
      this.page_size = 4;
    }
    else if (screenWidth < 800 && screenWidth >= 675) {
      this.page_size = 2;
    }
    else if (screenWidth < 675) {
      this.page_size = 1;
    }

  }}