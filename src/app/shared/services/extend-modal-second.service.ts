import { Injectable } from '@angular/core';
import { Observable, Subject, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtendModalSecondService {

  constructor() { }

  private extendModalSecond = new Subject();
  $extendModalSecond = this.extendModalSecond.asObservable();
  private extendModalUpdate = new Subject();
  $extendModalUpdate = this.extendModalUpdate.asObservable();

  dataSave(data:any[], name: string){
    this.extendModalSecond.next({data:data, name:name})
  }

  dataUpdate(data:any[], name: string){
    this.extendModalUpdate.next({data:data, name:name, item: "data"})
  }

  displayUpdate(data:any, name: string){
    this.extendModalUpdate.next({data:data, name:name, item: "display"})
  }

  
}
