import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: "app-satisfaction-icons",
  templateUrl: "./satisfaction-icons.component.html",
  styleUrls: ["./satisfaction-icons.component.scss"],
  host: {
    // Sets the role for this component to "progressbar"
    role: "figure",

    // Sets the minimum and maximum values for the progressbar role.
    "aria-valuemin": "-1",
    "aria-valuemax": "1",

    // Binding that updates the current value of the progressbar.
    "[attr.aria-valuenow]": "data"
  }
})
export class SatisfactionIconsComponent implements OnChanges {
  @Input() data: number;
  iconWidth: number;
  constructor() {}

  ngOnChanges() {
    this.iconWidth = 280 - (140 - this.data * 140);
  }
}
