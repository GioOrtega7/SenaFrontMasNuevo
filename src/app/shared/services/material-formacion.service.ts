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

  traerregistro(){
    return this._coreService.get<MaterialFormacion[]>('MaterialFormacion')
  }

  traerMF(id: number): Observable<any>{
    const url:string = `documento/${id}/ver`;
    return this._coreService.get<MaterialFormacion>(url);

  }

  enviarMF(MF: MaterialFormacion){

    MF.codigoMF=MF.codigoMF.toUpperCase();
    MF.descripcion=MF.descripcion.toUpperCase();
    
    const formData=new FormData();
    formData.append('codigoMF', MF.codigoMF);
    formData.append('', MF.descripcion);
    formData.append('codigoMF', MF.file);
    formData.append('codigoMF', MF.rutaarchivo);

    return this._coreService.post<MaterialFormacion>('MaterialFormacion',formData);


  }

  eliminarMF(id: number){

    const url=`evidencias/${id}`;
    return this._coreService.delete(url);

  }

  actualizarArea(newMF: MaterialFormacion){
    newMF.codigoMF=newMF.codigoMF.toUpperCase();
    newMF.file= new File([''], 'filename'),
    newMF.descripcion=newMF.descripcion.toLowerCase();
    newMF.rutaarchivo=newMF.rutaarchivo.toLowerCase();

    return this._coreService.post<MaterialFormacion[]>('MaterialFormacion')

  }



/*   public traerMaterialFormaciones(){
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
  } */


}

