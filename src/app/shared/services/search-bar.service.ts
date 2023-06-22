import { Injectable } from '@angular/core';
import{ Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class SearchBarService {
  private searchArrayService = new Subject<Array<any>>();
  $searchArrayService = this.searchArrayService.asObservable();
  private getModel = new Subject<Array<string>>;
  $getModel = this.getModel.asObservable();

  searchArrayUpdate(data: Array<any>) {
    this.searchArrayService.next(data);
  }

  getModelName(name: string, tableGetService: string){
    this.getModel.next([name, tableGetService])
  }
}
