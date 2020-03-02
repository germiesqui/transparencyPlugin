import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_More from "highcharts/highcharts-more";
import HC_SolidGauge from "highcharts//modules/solid-gauge.js";

HC_More(Highcharts);
HC_SolidGauge(Highcharts);

@Component({
  selector: "app-solidgauge-chart",
  templateUrl: "./solidgauge-chart.component.html",
  styleUrls: ["./solidgauge-chart.component.scss"],
  host: {
    // Sets the role for this component to "progressbar"
    role: "figure",

    // Sets the minimum and maximum values for the progressbar role.
    "aria-valuemin": "0",
    "aria-valuemax": "1",

    // Binding that updates the current value of the progressbar.
    "[attr.aria-valuenow]": "data"
  }
})
export class SolidgaugeChartComponent implements OnChanges {
  constructor() {}

  public Highcharts = Highcharts;
  public update = false;
  @Input() data;
  @Input() label;
  @Input() colorblind;

  //Red to green
  positiveColorCode = [
    [0, "#FF0000"],
    [0.19, "#FF0000"],
    [0.2, "#FFA500"],
    [0.39, "#FFA500"],
    [0.4, "#F0E68C"],
    [0.59, "#F0E68C"],
    [0.6, "#3CB371"],
    [0.79, "#3CB371"],
    [0.8, "#006400"],
    [1, "#006400"]
  ];

  //Green to red
  negativeColorCode = [
    [0, "#006400"],
    [0.19, "#006400"],
    [0.2, "#3CB371"],
    [0.39, "#3CB371"],
    [0.4, "#F0E68C"],
    [0.59, "#F0E68C"],
    [0.6, "#FFA500"],
    [0.79, "#FFA500"],
    [0.8, "#FF0000"],
    [1, "#FF0000"]
  ];

  negativeColorblindCode = [
    [0, "	#D3D3D3"],
    [0.19, "#D3D3D3"],
    [0.2, "#A9A9A9"],
    [0.39, "#A9A9A9"],
    [0.4, "#808080"],
    [0.59, "#808080"],
    [0.6, "#505050"],
    [0.79, "#505050"],
    [0.8, "#000000"],
    [1, "#000000"]
  ];

  positiveColorblindCode = [
    [0, "	#000000"],
    [0.19, "#000000"],
    [0.2, "#505050"],
    [0.39, "#505050"],
    [0.4, "#808080"],
    [0.59, "#808080"],
    [0.6, "#A9A9A9"],
    [0.79, "#A9A9A9"],
    [0.8, "#D3D3D3"],
    [1, "#D3D3D3"]
  ];

  public options = {
    chart: {
      type: "solidgauge",
      backgroundColor: "rgba(0,0,0,0)",
      style: {
        "max-width": "350px"
      }
    },

    title: {
      text: this.label,
      x: 0
    },

    pane: {
      center: ["50%", "90%"],
      size: "140%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#FFF",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "solid"
      }
    },

    tooltip: {
      enabled: false
    },

    yAxis: {
      stops: [[0.1, "#55BF3B"]],
      min: 0,
      max: 100,
      lineWidth: 0,
      gridLineColor: "black",
      tickAmount: 5,
      labels: {
        y: 20,
        style: '{"font-size": 1.1rem;}'
      }
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },

    series: [
      {
        name: this.label,
        data: [this.data],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px;color:' +
            "black" +
            '">{y}</span><br/></div>'
        }
      }
    ]
  };

  ngOnChanges() {
    if (this.colorblind) {
      if (this.label === "Subjetividad") {
        this.options.yAxis.stops = this.negativeColorblindCode;
        this.options.yAxis.min = 0;
        this.options.yAxis.max = 1;
      } else {
        this.options.yAxis.stops = this.positiveColorblindCode;
        this.options.yAxis.min = -1;
        this.options.yAxis.max = 1;
      }
    } else {
      if (this.label === "Subjetividad") {
        this.options.yAxis.stops = this.negativeColorCode;
        this.options.yAxis.min = 0;
        this.options.yAxis.max = 1;
      } else {
        this.options.yAxis.stops = this.positiveColorCode;
        this.options.yAxis.min = -1;
        this.options.yAxis.max = 1;
      }
    }

    this.options.series = [
      {
        name: this.label,
        data: [this.data],
        dataLabels: {
          format:
            '<div style="width:85px; text-align:center;"><span style="font-size:25px;color:' +
            "black;width:100px;" +
            '">{y}</span><br/></div>'
        }
      }
    ];

    this.options.title.text = this.label;

    this.update = true;
  }
}
