import { Component, Input, OnChanges } from '@angular/core';
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"]
})
export class BarChartComponent implements OnChanges {
  @Input() barChartLabels: string[] = ["default"];
  @Input() data: number[] = [1];
  @Input() label: string = "default";

  public chartType: string = "bar";

  public chartDatasets: Array<any> = [{ data: this.data, label: this.label }];

  public chartOptions: any = {
    responsive: true
  };

  ngOnChanges() {
    this.chartDatasets = [{ data: this.data, label: this.label }];
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
}