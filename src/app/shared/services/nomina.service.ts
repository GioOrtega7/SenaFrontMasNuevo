import { Injectable } from '@angular/core';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class NominaService {


  constructor(
    private coreService:CoreService,
  ) { }

  importarExcel(archivo: File){
    const formData = new FormData();
    formData.append('documento', archivo);
    return this.coreService.post('nomina', formData);
  }

}




