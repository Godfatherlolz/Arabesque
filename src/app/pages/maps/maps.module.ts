import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { CountryOrdersMapComponent } from './country-orders/map/country-orders-map.component';
import { CountryOrdersComponent } from './country-orders/country-orders.component';
import { CountryOrdersChartComponent } from './country-orders/chart/country-orders-chart.component';
import { CountryOrdersMapService } from './country-orders/map/country-orders-map.service';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MapsComponent } from './maps.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    MapsComponent,
    CountryOrdersMapComponent,
    CountryOrdersComponent,
    CountryOrdersChartComponent

  ],
  providers: [
    CountryOrdersMapService,
  ],
})
export class MapsModule { }
