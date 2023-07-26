import { Component, Input, OnInit } from '@angular/core';
import { MaterialFormacion } from '../shared/models/material-formacion.model';
import { MaterialFormacionService } from '../shared/services/material-formacion.service';

@Component({
  selector: 'app-material-formacion-list',
  templateUrl: './material-formacion-list.component.html',
  styleUrls: ['./material-formacion-list.component.css'],
})
export class MaterialFormacionListComponent {
/*   materialFormaciones: MaterialFormacion[] = [];

  constructor(private materialFormacionService: MaterialFormacionService) {}

  ngOnInit(): void {
    this.loadMaterialFormaciones();

  }

  loadMaterialFormaciones(): void {
    this.materialFormacionService.traerMaterialFormaciones().subscribe(
      (data) => {
        this.materialFormaciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }



  loadMaterialFormaciones(): void {
    this.materialFormacionService.getMaterialFormaciones().subscribe((data) => {
      this.materialFormaciones = data;
    });
  } */
}