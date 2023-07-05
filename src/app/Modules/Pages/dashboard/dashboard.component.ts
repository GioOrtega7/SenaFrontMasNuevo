import { Component } from '@angular/core';
import { menu } from 'src/app/Core/home/navbar/nav-material';
import { NavegationModel } from 'src/app/shared/models/navegation.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
menu: NavegationModel[] = menu;

}
