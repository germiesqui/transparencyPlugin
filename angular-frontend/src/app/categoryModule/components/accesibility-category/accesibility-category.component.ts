import { Component, OnInit } from '@angular/core';
import { BackendService } from "src/app/backend.service";

@Component({
  selector: "app-accesibility-category",
  templateUrl: "./accesibility-category.component.html",
  styleUrls: ["./accesibility-category.component.scss"]
})
export class AccesibilityCategoryComponent implements OnInit {

  constructor(private backendService: BackendService) {
    this.backendService.getEntities().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
