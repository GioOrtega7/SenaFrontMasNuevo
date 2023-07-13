import { Component, Output , Input, HostListener, SimpleChanges, EventEmitter} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-charge-wheel-sole',
  templateUrl: './charge-wheel-sole.component.html',
  styleUrls: ['./charge-wheel-sole.component.css']
})
export class ChargeWheelSoleComponent {
  fechaInicio: Date;
  fechaActual:Date;
  fechaFinal:Date;
  porsentajeDias:number=0; 
  porcentajeNumerico: number[];
  colores: string[];
  @Input() view: ChargeWheelFiller = {} as ChargeWheelFiller;
  @Output() dataInformation = new EventEmitter<number>();
  @Output() dataToUpdate = new EventEmitter<any>();
  @Output() dataToDelete = new EventEmitter<any>();
  @Output() redirectData = new EventEmitter<number>();

  generate: boolean = false; 

  constructor() {
    this.fechaInicio = new Date('2023-06-01');
    this.fechaActual = new Date();
    this.fechaFinal = new Date('2023-09-01');
    
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

  ngOnInit() {
    if(this.view == undefined || this.view == {} as ChargeWheelFiller || !Object(this.view).keys)
    this.view = {
      itemId: -1,
      itemName: "  ",
      itemCode: "  ",
      itemOne: "  ",
      itemTwo: "  ",
      itemThree: "  ",
      itemFechafin: new Date(2023, 6, 9),
      itemFechainicio: new Date(2023, 6, 9),
      itemPercentaje: 0
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.obtenerPorcentajeDiasTranscurridos()
    if (changes['view']) {

      if(Object.keys(this.view).length !== 0){
        const { itemFechafin,itemFechainicio } = this.view;
          const totalDias = (new Date(itemFechafin).getTime() - new Date(itemFechainicio).getTime()) / (1000 * 3600 * 24);
          const diasTranscurridos = (this.fechaActual.getTime() - new Date(itemFechainicio).getTime()) / (1000 * 3600 * 24);
          const porcentaje = (diasTranscurridos / totalDias) * 100;
          const porcentajedias = Math.round(porcentaje);
          this.view.itemPercentaje = porcentajedias 
        this.generate= true
      }else{this.generate= false}
    }
    
  }
  obtenerPorcentajeDiasTranscurridos(){
    const totalDias = (this.fechaFinal.getTime() - this.fechaInicio.getTime()) / (1000 * 3600 * 24);
    const diasTranscurridos = (new Date().getTime() - this.fechaInicio.getTime()) / (1000 * 3600 * 24);
    const porcentaje = (diasTranscurridos / totalDias) * 100;
    const porcentajedias = Math.round(porcentaje)
    this.porsentajeDias= porcentajedias
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

  redirect(id: number){   
    this.redirectData.emit(id)
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