
import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import 'slick-carousel';
import * as $ from 'jquery';
import { ProyectoFormativoModalComponent } from '../proyecto-formativo-modal/proyecto-formativo-modal.component';
import { ProyectoFormativoModel } from 'src/app/shared/models/proyecto-formativo.model ';
import { ProyectoFormativoService } from 'src/app/shared/services/proyecto-formativo.service';
import { NotificationService } from 'src/app/shared/services/notification-service';

@Component({
  selector: 'app-proyecto-formativo',
  templateUrl: './proyecto-formativo.component.html',
  styleUrls: ['./proyecto-formativo.component.css']
})
export class ProyectoFormativoComponent {


  proyecto!: ProyectoFormativoModel;
  proyectos: ProyectoFormativoModel[] = [];


  @ViewChild('slickElement') slickElement!: ElementRef;
  porcentajeNumericos: number[];
  colores: string[];

  constructor(
    private dialogRef: MatDialogRef<ProyectoFormativoComponent>,
    private modal: MatDialog,
    private ProyectoService: ProyectoFormativoService,
    private NotificationService : NotificationService
  ) {
    this.porcentajeNumericos = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    this.colores = [];
    for (let i = 0; i < this.porcentajeNumericos.length; i++) {
      const currentPorcentaje = this.porcentajeNumericos[i];
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


  openModalUpdate(proyecto: ProyectoFormativoModel) {
    let dialogRef = this.modal.open(ProyectoFormativoModalComponent, {
      data: proyecto,
    });   
  }

  openModalCreate() {
    this.modal.open(ProyectoFormativoModalComponent);
    this.proyecto = {} as ProyectoFormativoModel;
  }


  getProyecto() {
    this.ProyectoService.traerProyecto()
      .subscribe(proyecto => {
        this.proyectos = proyecto;
      }, error => {
        this.NotificationService.showNotification({message:"Error de conexión"});
      });
  }

  deleteProyecto(proyectoId: number) {
    this.ProyectoService.eliminarProyecto(proyectoId).subscribe(() => {
      this.getProyecto();
    })
  }



  guardarProyecto(proyecto: ProyectoFormativoModel) {
    if (proyecto.id) {
      this.ProyectoService.actualizarProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
      });
    } else {
      this.ProyectoService.crearProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
        console.log('llega asi',proyecto);
      })
    }
  }

  reset() {
    this.proyecto = {} as ProyectoFormativoModel;
    //this.showModalProyecto = false;
  }


  ngOnInit(): void {
    this.getProyecto();
  }


  ngAfterViewChecked(): void {
    if (this.slickElement.nativeElement.children.length > 3) {
      $(this.slickElement.nativeElement).slick({
        rows: 3,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 3
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 2
            }
          },
          {
            breakpoint: 730,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 1
            }
          }
        ]
      });
    }
  }

}