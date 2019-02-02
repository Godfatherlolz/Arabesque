import { Component, OnDestroy } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'xxlarge'">
      <nb-card-header>Country Orders Statistics</nb-card-header>
      <nb-card-body>
        <ngx-country-orders-map (select)="selectCountryById($event)"
                                countryId="USA">
        </ngx-country-orders-map>
        <ngx-country-orders-chart [countryName]="countryName"
                                  [data]="countriesCategories"
                                  maxValue="50">
        </ngx-country-orders-chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnDestroy {

  private alive = true;

  countryName = '';
  CountrySectors: any;
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private countryOrderService: CountryOrderData,
    private _logService: LogService
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this._logService.sectorspercountry("USA")
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
     
  }

  selectCountryById(data) {
    console.log(data);
    this.countryName = data.countryName;
    /* console.log(countryName)
     console.log(this._logService.sectorspercountry(countryName))
     console.log(this.countryData)*/
    //this.CountrySectors = this._logService.sectorspercountry(data.countryID);
    //this.countryData = this._logService.sectorspercountry(data.countryID).data;
    //this.countriesCategories = this._logService.sectorspercountry(data.countryID).labels;
    //let sectors = [];

    this._logService.sectorspercountry(data.countryID)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData) => {
        this.countriesCategories = countryData;
      //  console.log(this.countryData)
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
