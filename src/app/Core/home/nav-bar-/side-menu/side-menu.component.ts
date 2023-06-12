import { AfterViewInit, Component, Input } from '@angular/core';
import { NavegationModel } from 'src/app/shared/models/navegation.model';
import { menu } from '../bar/bar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})


export class SideMenuComponent implements AfterViewInit {
  /* @Input() menuitems: { menuitem:NavegationModel[]} = {
     menuitem:[]
   }
 
   const objeto: { menuitem: NavegationModel[] } = {
     menuitem: [/* array de NavegationModel ]
   };
 */
  classState: boolean = false;
  toggleClass() {
    this.classState = !this.classState;
    console.log("aaaaaa")
  }

  menue: NavegationModel[] = [
    {
      name: 'Programas Formativos',
      url: 'programa-formativo'
    },
    {
      name: 'Proyectos Formativos',
      url: 'proyecto-formativo'
    },
    {
      name: 'Sedes',
      url: 'sede'
    }
  ]

  filler: any;

  ngAfterViewInit(): void {
    this.filler = Array.from(this.menue);
    console.log(this.filler)
  }

}

