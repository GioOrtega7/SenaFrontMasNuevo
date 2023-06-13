import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { Subscription } from 'rxjs';
import 'slick-carousel';
import * as $ from 'jquery';
import { NotificationService } from 'src/app/shared/services/notification-service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit, AfterViewChecked, OnDestroy {

  
  @ViewChild('slickElement') slickElement!: ElementRef;
  protected cache: Map<number, { areas: AreaModel[] | null }> = new Map<number, { areas: AreaModel[] | null }>();
  protected showFormArea:boolean= false;
  protected formTitle: string = "";
  protected showResultadoBusqueda: boolean = false;
  protected resultadoBusqueda: AreaModel | null = null;
  area: AreaModel | null = null;
  areas: AreaModel[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private notificationService:NotificationService,
    private _areaService: AreaService
    
  ) {}

  ngOnInit() {
    this.iniciarCache();
    this.getAreas();
  }
  
  iniciarCache() {
    this.cache.set(0, { areas: null });
  }
  getAreas() {
    const cacheAreas = this.cache.get(0)!.areas;
    if (cacheAreas !== null) {
      if (this.areas !== cacheAreas) {
        this.areas = cacheAreas;
      }
    } else {
      this._areaService.traerAreas().subscribe(
        area => {
          this.areas = area;
          this.cache.get(0)!.areas = this.areas;
        },
        error => {
          this.notificationService.showNotification({message:"Error de conexión"});
        }
      );
    }
  }
  eliminarArea(event:number){
    this._areaService.borrarArea(event).subscribe(()=>{
      this.getAreas();
      
    })
  }

  actualizarArea(event: AreaModel){
    this.formTitle='Editar área';
    this.area=event;
    this.showFormArea=true;
  }

  crearArea(){
    this.showFormArea=true;
    this.formTitle='Añadir área';
  }

  guardarArea(event:AreaModel){
    if(event.id){
      this._areaService.actualizarArea(event).subscribe(()=>{
        this.getAreas();
        this.reset();
      });
    }else{
      this._areaService.guardarArea(event).subscribe(()=>{
        this.getAreas();
        this.reset();
      });
    }
  }
  buscarArea(event:AreaModel){
    this.showResultadoBusqueda=true;
    this.resultadoBusqueda=event;
  }
  closeBusqueda(){
    this.showResultadoBusqueda=false;
    this.resultadoBusqueda=null;
  }
  reset(){
    this.showFormArea=false;
    this.showResultadoBusqueda=false;
    this.resultadoBusqueda=null;
    this.formTitle='';
    this.area=null;
  }
  ngAfterViewChecked(): void {
    if (this.slickElement.nativeElement.children.length > 3) {
      $(this.slickElement.nativeElement).slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              rows: 2
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}