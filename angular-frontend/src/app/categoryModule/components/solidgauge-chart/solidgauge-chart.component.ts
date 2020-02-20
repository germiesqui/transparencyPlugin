import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_More from "highcharts/highcharts-more";
import HC_SolidGauge from "highcharts//modules/solid-gauge.js";

HC_More(Highcharts);
HC_SolidGauge(Highcharts);

@Component({
  selector: "app-solidgauge-chart",
  templateUrl: "./solidgauge-chart.component.html",
  styleUrls: ["./solidgauge-chart.component.scss"]
})
export class SolidgaugeChartComponent implements OnChanges {
  constructor() {}

  public Highcharts = Highcharts;
  public update = false;
  @Input() data;
  @Input() label;

  public options = {
    chart: {
      type: "solidgauge"
    },

    title: {
      text: this.label
    },

    pane: {
      center: ["27%", "80%"],
      size: "140%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc"
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
      tickAmount: 6,
      labels: {
        y: 16
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
        name: "Subjetividad",
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
    console.log(this.data);
    this.options.series = [
      {
        name: "Subjetividad",
        data: [this.data],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px;color:' +
            "black" +
            '">{y}</span><br/></div>'
        }
      }
    ];
    
    this.options.title = this.label;

    this.update = true;
  }
}
