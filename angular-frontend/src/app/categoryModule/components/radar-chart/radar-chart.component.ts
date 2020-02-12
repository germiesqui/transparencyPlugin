import { Component, Input, OnChanges } from "@angular/core";
import { ChartDataSets, ChartType, RadialChartOptions } from "chart.js";
import {Label} from 'ng2-charts'

@Component({
  selector: "app-radar-chart",
  templateUrl: "./radar-chart.component.html",
  styleUrls: []
})
export class RadarChartComponent implements OnChanges {
  @Input() radarChartLabels: Label[];
  @Input() data: number[];
  @Input() label: string;

  public radarChartData: ChartDataSets[];

  public radarChartOptions: RadialChartOptions = {
    responsive: true
  };

  public radarChartType: ChartType = "radar";

  constructor() {}

  ngOnChanges() {
    this.radarChartData = [{ data: this.data, label: this.label }];
    this
  }

  // events
  public chartClicked(event) {
    console.log(event);
  }

}
