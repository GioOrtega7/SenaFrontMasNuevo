import { Component } from '@angular/core';

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

  board:board[]=[
    {
      titulos:'Nombre',
      datos:'adso',
      id:1
    },
    {
      titulos:'apelldo',
      datos:'adso',
      id:1
    },
    {
      titulos:'Nombre',
      datos:'adso',
      id:1
    }
  ]
}
