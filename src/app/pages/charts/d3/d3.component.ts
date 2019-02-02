import { Component, SimpleChanges, OnChanges } from '@angular/core';
import * as moment from 'moment'
import * as _ from 'lodash';
import { ApiService } from '../../../services/api.service';
import { runInThisContext } from 'vm';
import { LogService } from '../../../services/log.service';
@Component({
  selector: 'ngx-d3',
  styleUrls: ['./d3.component.scss'],
  templateUrl: './d3.component.html',
})
export class D3Component implements OnChanges {
  list: any = [];
  listPreferance: any = [];
  allCountries = [];
  render = false;
  listActionFilter = [];
  countriesSectors = [];
  barData: any = { countries: null, dates: null };
  pieChartList: any = null;
  dateLoads: any = null;
  logs_data: any = {}
  dateStart: any;
  dateEnd: any;
  loadData: any = [];;
  constructor(private _api: ApiService, private _logService: LogService) {
    this._api.load().subscribe(data => {
      this.logs_data = data;
      this.list = this.logs_data.logs;
      this.dateStart = _.minBy(this.list, 'date').date;
      this.dateEnd = _.maxBy(this.list, 'date').date;
      this.allCountriess();
      this.countriesSectors = this.preferanceByCountry();

      this.countriesSectors = this.preferanceByCountry();
      this._logService.preferance().subscribe(pref => {
        this.pieChartList = pref
      })
      this._logService.activities().subscribe(activities => {
        this.barData.countries = activities
      });
      this._logService.loads().subscribe(loads => {
        this.loadData = loads
      })
    })

  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    /*console.log(changes.barData.currentValue)*/
  }
  getRangeDate(event) {
    this.render = false;
    if (event.start && event.end) {
      this._logService.dateChange(event.start, event.end).subscribe(data => {
        if (this.barData.dates != data) {
          this.barData.dates = data;
          if(data.dates.length==0){
            this.render= false
          }else{
            this.render = true;
          }
        }
      });
    }
  }
  sectorspercountry(country) {
    let newList = []
    this.listActionFilter.forEach(element => {
      let c = element.payload ? (element.payload.countryCode ? element.payload.countryCode : null) : null
      if (c) {
        if (_.includes(c, country)) {
          let preferance = element.payload ? (element.payload.sector ? element.payload.sector : ["no sector"]) : ["no sector"]
          newList = newList.concat(preferance);
        }
      }
    });
    return _.countBy(newList)
  }
  preferanceByCountry() {
    let data = [];
    this.allCountries.forEach(element => {
      let _series = [];
      let temp_list = this.sectorspercountry(element);
      for (var key in temp_list) {
        if (temp_list.hasOwnProperty(key)) {
          _series.push({ name: key, value: temp_list[key] })
        }
      }
      data.push({ name: element, series: _series });
    });
    return data;
  }
  allCountriess() {
    this.listActionFilter = this.list.filter(item => item.action == "FILTER");
    this.listActionFilter.forEach(element => {
      let countries = element.payload ? (element.payload.countryCode ? element.payload.countryCode : ["no country"]) : ["no country"]
      this.allCountries = this.allCountries.concat(countries);
    });
    this.allCountries = _.uniqBy(this.allCountries)
  }
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}



