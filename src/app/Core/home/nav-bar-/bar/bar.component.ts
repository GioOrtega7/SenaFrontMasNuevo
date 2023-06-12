import { OnInit,AfterViewInit,Component, Directive , QueryList, ElementRef, ViewChild, ViewChildren,Renderer2 } from '@angular/core';
import { NavegationModel } from 'src/app/shared/models/navegation.model';

export const menu:NavegationModel[]=[
  {
    name:'Programas Formativos',
    url:'programa-formativo'
  },
  {
    name:'Proyectos Formativos',
    url:'proyecto-formativo'
  },
  {
    name:'Sedes',
    url:'sede'
  }
]


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})



export class BarComponent{
  

}

