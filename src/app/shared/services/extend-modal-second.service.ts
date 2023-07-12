import { Injectable } from '@angular/core';
import { Observable, Subject, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtendModalSecondService {

  constructor() { }

  private extendModalSecondSave= new Subject();
  $extendModalSecondSave = this.extendModalSecondSave.asObservable();
  private extendModalSecondUpdate = new Subject();
  $extendModalSecondUpdate = this.extendModalSecondUpdate.asObservable();
  private extendModalUpdate = new Subject();
  $extendModalUpdate = this.extendModalUpdate.asObservable();

  dataSaveService(data:any[], name: string){
    this.extendModalSecondSave.next({data:data, name:name});
  }

  dataUpdateService(data:any[], name: string){
    this.extendModalSecondUpdate.next({data:data, name:name})
  }

  dataUpdate(data:any[], name: string){
    this.extendModalUpdate.next({data:data, name:name, item: "data"})
  }

  displayUpdate(data:any, name: string){
    this.extendModalUpdate.next({data:data, name:name, item: "display"})
  }

  
}