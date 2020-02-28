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

  //Red to green
  positiveColorCode = [
    [0, "#FF0000"],
    [0.2, "#FFA500"],
    [0.4, "#F0E68C"],
    [0.6, "#3CB371"],
    [0.8, "#006400"]
  ];

  //Green to red
  negativeColorCode = [
    [0, "#006400"],
    [0.2, "#3CB371"],
    [0.4, "#F0E68C"],
    [0.6, "#FFA500"],
    [0.8, "#FF0000"]
  ];

  public options = {
    chart: {
      type: "solidgauge",
      backgroundColor: "#F2F5EA",
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
      stops: [
        [0.1, "#55BF3B"],
        [0.4, "#DDDF0D"],
        [0.7, "#DF5353"]
      ],
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
    if (this.label === "Subjetividad") {
      this.options.yAxis.stops = this.negativeColorCode;
      this.options.yAxis.min = 0;
      this.options.yAxis.max = 1;
    } else {
      this.options.yAxis.stops = this.positiveColorCode;
      this.options.yAxis.min = -1;
      this.options.yAxis.max = 1;
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
