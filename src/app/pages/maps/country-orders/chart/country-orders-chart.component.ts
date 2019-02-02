import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils/layout.service';


@Component({
  selector: 'ngx-country-orders-chart',
  styleUrls: ['./country-orders-chart.component.scss'],
  template: `
    <div class="header">
      <span class="title">Selected Country</span>
      <h2>{{countryName}}</h2>
      <table class="table table-dark">
        <thead>
          <tr>
            <td>Sectors</td>
            <td>Weight</td>
          </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of data">
          <td>{{item.sector}}</td>
          <td>{{item.value}}</td>
        </tr>
        </tbody>
      </table>
     
    </div>
    
  `,
})
export class CountryOrdersChartComponent implements  OnDestroy, OnChanges {

  @Input() countryName: string;
  @Input() data: number[];
  @Input() maxValue: number;
  @Input() labels: string[];

  private alive = true;



  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.isFirstChange()) {
        // For Some reason
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
