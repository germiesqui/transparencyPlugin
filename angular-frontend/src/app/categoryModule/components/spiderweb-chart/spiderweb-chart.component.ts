import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_More from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";

HC_More(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: "app-spiderweb-chart",
  templateUrl: "./spiderweb-chart.component.html",
  styleUrls: ["./spiderweb-chart.component.scss"],
  host: {
    // Sets the role for this component to "progressbar"
    role: "figure",

    // Sets the minimum and maximum values for the progressbar role.
    "aria-valuemin": "0",

    // Binding that updates the current value of the progressbar.
    "[attr.aria-valuenow]": "data"
  }
})
export class SpiderwebChartComponent implements OnInit, OnChanges {
  @Input() spiderwebCategories: string[];
  @Input() data: number[];
  @Input() label: string;

  public loadingData: boolean = true;
  public dateProduction: Date = new Date();

  /* HighChart */
  public updateFlag: boolean = true; // optional boolean
  public oneToOneFlag: boolean = true; // optional boolean, defaults to false
  public Highcharts: any = Highcharts; // required
  public chartConstructor: string = "chart"; // optional string, defaults to 'chart'
  public progressTracking: any = {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "#D6DBD2"
    },

    title: {
      text: this.label,
      x: 0
    },

    pane: {
      size: "60%"
    },

    xAxis: {
      categories: this.spiderwebCategories,
      tickmarkPlacement: "on",
      lineWidth: 0
    },

    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0
    },

    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} palabras</b><br/>'
    },

    series: [
      {
        name: "Sentimientos",
        data: this.data,
        pointPlacement: "on"
      }
    ]
  }; // required

  constructor() {}
  ngOnChanges(): void {
    this.progressTracking.xAxis = {
      categories: this.spiderwebCategories,
      tickmarkPlacement: "on",
      lineWidth: 0
    };
    this.progressTracking.series = [
      {
        showInLegend: false,
        name: this.label,
        data: this.data,
        pointPlacement: "on"
      }
    ];
    this.progressTracking.title = {
      text: this.label,
      x: 0
    };
    this.updateFlag = true;
  }
  public ngOnInit(): void {
    this.loadingData = false;
  }

  public chartCallback(): void {
    console.log("Production progress");
    this.loadingData = false;
  } // optional function, defaults to null
}

