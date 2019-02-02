import { Component, OnInit, OnDestroy, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-d3-bar-dates',
  template: 
  `<ngx-charts-bar-vertical
    [scheme]="colorScheme"
    [results]="results"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    [legend]="showLegend"
    [xAxisLabel]="xAxisLabel"
    [yAxisLabel]="yAxisLabel">
  </ngx-charts-bar-vertical>
`,
})
export class D3BarDatesComponent implements OnChanges,  OnDestroy {

  results = [
  
  ];

  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Date Range';
  yAxisLabel = 'Unique Loads';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }
  
    
 ngOnChanges(changes: SimpleChanges): void {
   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   //Add '${implements OnChanges}' to the class.
  
 }

ngOnInit(): void {
 
  
}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
