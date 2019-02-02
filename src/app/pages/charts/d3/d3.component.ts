import { Component, SimpleChanges, OnChanges } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LogService } from '../../../services/log.service';
@Component({
  selector: 'ngx-d3',
  styleUrls: ['./d3.component.scss'],
  templateUrl: './d3.component.html',
})
export class D3Component implements OnChanges {

  constructor(private _api: ApiService, private _logService: LogService) {
   
  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  getRangeDate(event) {
    
  }
 
  preferanceByCountry() {
   
  }
  allCountriess() {
   
  }
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}



