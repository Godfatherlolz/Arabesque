import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { of as observableOf, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogService {
 
  constructor(private _api: ApiService) {}
  
  dateChange(dateStart, dateEnd): Observable<any> {
      let list: any = [];
      return observableOf(list);
  }
 
  activities(): Observable<any> {
    let list: any = [];
    return observableOf(list);
  }

  sectorspercountry(country): Observable<any> {
    let _series = [];
    return observableOf(_series);
  }

  allCountriess(): Observable<any> {
    let list: any = [];
    return observableOf(list);
  }
  loads(): Observable<any> {
    let list: any = [];
    return observableOf(list);
    }
  
}
