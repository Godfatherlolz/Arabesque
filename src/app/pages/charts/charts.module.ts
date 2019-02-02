import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { D3BarComponent } from './d3/d3-bar.component';
import { D3LineComponent } from './d3/d3-line.component';
import { D3PieComponent } from './d3/d3-pie.component';
import { D3AdvancedPieComponent } from './d3/d3-advanced-pie.component';
import { D3BarDatesComponent } from './d3/d3-bar-dates.component';
import { D3PieCountrySectorComponent } from './d3/d3-pie-country-sector.component';

const components = [
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AdvancedPieComponent,
  D3PieCountrySectorComponent
];

@NgModule({
  imports: [ThemeModule, ChartsRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components, D3BarDatesComponent],
})
export class ChartsModule {}
