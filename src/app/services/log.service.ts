import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as moment from 'moment'
import * as _ from 'lodash';
import { of as observableOf, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  list: any = [];
  listPreferance: any = [];
  allPreferance: any = []
  allCountries = [];
  listActionFilter = [];
  logs_data: any = {}
  dateStart: any;
  dateEnd: any;
  constructor(private _api: ApiService) {
    this._api.load().subscribe(data => {
      this.logs_data = data;
      this.list = this.logs_data.logs;
      this.dateStart = _.minBy(this.list, 'date').date;
      this.dateEnd = _.maxBy(this.list, 'date').date;
      this.allCountriess().subscribe(countries => {
        this.allCountries = countries
      })
      this.preferance()
    })

  }
  preferanceByCountry(): Observable<any> {
    let data = [];
    this.allCountries.forEach(element => {
      let _series = [];
      this.sectorspercountry(element).subscribe(s_per => {
        for (var key in s_per) {
          if (s_per.hasOwnProperty(key)) {
            _series.push({ name: key, value: s_per[key] })
          }
        }
        data.push({ name: element, series: _series });
      });
    });
    return observableOf(data);
  }
  dateChange(dateStart, dateEnd): Observable<any> {
    if (dateEnd && dateStart) {
      const dStart = moment(dateStart);
      const dEnd = moment(dateEnd);
      let list: any = [];
      let d = this.list.filter(item => moment(item.date).isBetween(dStart, dEnd) && item.action == "LOAD"
      );
      let dayDiff = dEnd.diff(dStart, "days")
      for (let index = 0; index <= dayDiff; index++) {
        let newDate = moment(this.addDays(dStart, index)).format("YYYY-MM-DD");
        let ll = d.filter(item => newDate == moment(item.date).format("YYYY-MM-DD"))
        let newList = _.uniqBy(ll, 'user_id');
        list.push({ name: newDate, value: newList.length });
      }

      return observableOf(list);
    }
  }
  activityPerCountry(country) {
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
    return newList.length

  }
  activities(): Observable<any> {
    let data = [];
    this.allCountries.forEach(element => {
      data.push({ name: element, value: this.activityPerCountry(element) });
    });
    return observableOf(data);
  }
  preferance(): Observable<any> {
    let d = this.list.filter(item => item.action == "FILTER");
    d.forEach(element => {
      let preferance = element.payload ? (element.payload.sector ? element.payload.sector : ["no sector"]) : ["no sector"]
      this.listPreferance = this.listPreferance.concat(preferance)
    });
    return observableOf(_.countBy(this.listPreferance));
  }

  sectorspercountry(country): Observable<any> {
    let _series = [];
    let sectors = [];
    let newList = [];

    this.listActionFilter.forEach(element => {
      let c = element.payload ? (element.payload.countryCode ? element.payload.countryCode : null) : null
      if (c) {
        if (_.includes(c, country)) {
          let preferance = element.payload ? (element.payload.sector ? element.payload.sector : ["no sector"]) : ["no sector"]
          newList = newList.concat(preferance);
        }
      }
    });
    let temp_list = _.countBy(newList);
    for (var key in temp_list) {
      if (temp_list.hasOwnProperty(key)) {
        _series.push({ sector: key, value: temp_list[key] })
        // _series.push(key)
        //  sectors.push(temp_list[key])
      }
    }
    return observableOf(_series);
  }
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  allCountriess(): Observable<any> {
    this.listActionFilter = this.list.filter(item => item.action == "FILTER");
    this.listActionFilter.forEach(element => {
      let countries = element.payload ? (element.payload.countryCode ? element.payload.countryCode : ["no country"]) : ["no country"]
      this.allCountries = this.allCountries.concat(countries);
    });
    return observableOf(_.uniqBy(this.allCountries));
  }
  loads(): Observable<any> {
    if (this.dateEnd && this.dateStart) {
      const dStart = moment(this.dateStart);
      const dEnd = moment(this.dateEnd);
      let list: any = [];
      let delivered = [];
      let dayDiff = dEnd.diff(dStart, "days")
      //let chosen = moment(this.randomDate(this.dateStart,this.dateEnd));
      let d = this.list.filter(item => moment(item.date).isBetween(dStart, dEnd) && item.action == "LOAD"
      );
      for (let index = 0; index <= dayDiff; index++) {
        let newDate = moment(this.addDays(dStart, index)).format("YYYY-MM-DD");
        let ll = d.filter(item => newDate == moment(item.date).format("YYYY-MM-DD"))
        let newList = _.uniqBy(ll, 'user_id');
        delivered.push({ date: newDate, users: ll.length });
        list.push({ date: newDate, users: newList.length });
      }
      let chosen_index = Math.floor(Math.random() * list.length)
      let chosen_from_uniq = list[chosen_index];
      let chosen_from_all = delivered[chosen_index];
      let dataList = { date: chosen_from_all.date, data: [{ name: "LOADS", value: chosen_from_all.users }, { name: "Unique Loads", value: chosen_from_uniq.users }] }
      return observableOf(dataList)
    }
  }
}
