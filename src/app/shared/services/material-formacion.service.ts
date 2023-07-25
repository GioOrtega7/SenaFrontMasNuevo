import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';
import { MaterialFormacion } from '../models/material-formacion.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialFormacionService {
  //private apiUrl = 'http://localhost:8000/api/material_formacions'; // Reemplaza la URL con la ruta de tu API de Laravel

  constructor(private _coreService:CoreService) {}

  public traerMaterialFormaciones(){
    return this._coreService.get<MaterialFormacion[]>('MaterialFormacion');

  }

  public crearMaterialFormacion(mFormacion: MaterialFormacion){
    return this._coreService.post<MaterialFormacion>('MaterialFormacion', mFormacion);

  }

  public eliminarMaterialFormacion(mFormacionId: number){
    return this._coreService.delete('MaterialFormacion/' + mFormacionId);

  }

  public actualizarMaterialFormacion(mFormacion: MaterialFormacion){
    return this._coreService.put('MaterialFormacion/' + mFormacion.id, mFormacion);
  }


}

