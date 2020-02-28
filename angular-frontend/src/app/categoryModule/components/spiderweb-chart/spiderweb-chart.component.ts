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
      backgroundColor: "#F2F5EA",
      style: {
        "font-size": "1.6rem"
      }
    },

    title: {
      text: this.label,
      x: 200
    },

    pane: {
      center: ["56%", "40%"],
      size: "60%"
    },

    xAxis: {
      categories: this.spiderwebCategories,
      labels: {
        style: {
          fontSize: "20px"
        },
        distance: 10
      },
      tickmarkPlacement: "on",
      lineWidth: 0,
      gridLineColor: "grey"
    },

    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      gridLineColor: "grey",
      min: 0
    },

    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}; font-size:15px;">{series.name}: <b>{point.y:,.0f} palabras</b><br/>'
    },

    series: [
      {
        name: "Sentimientos",
        data: this.data,
        color: "#924859",
        pointPlacement: "on"
      }
    ]
  }; // required

  constructor() {}
  ngOnChanges(): void {
    this.progressTracking.xAxis = {
      categories: this.spiderwebCategories,
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          fontSize: "14px",
          color: "black"
        },
        distance: 10
      },
      gridLineColor: "grey"
    };
    this.progressTracking.series = [
      {
        showInLegend: false,
        name: this.label,
        data: this.data,
        color: "#c44f6a",
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

