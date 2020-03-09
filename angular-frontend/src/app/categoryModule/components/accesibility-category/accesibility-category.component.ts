import { Component, OnInit } from '@angular/core';
import { BackendService } from "src/app/backend.service";
import { IBasicData } from '../basic-data-category/basicData';

@Component({
  selector: "app-accesibility-category",
  templateUrl: "./accesibility-category.component.html",
  styleUrls: ["./accesibility-category.component.scss"]
})
export class AccesibilityCategoryComponent implements OnInit {
  // Category Data
  title: string = "Noticia Accesible";
  url: string = "/accesibility";
  description: string = "Provee de accesibilidad a la noticia.";
  icon: string = "accessibility_new";

  basicData: IBasicData;
  daltonicMode: boolean;

  constructor(private backendService: BackendService) {
    this.backendService.getBasicData().subscribe(
      data => (this.basicData = data),
      err => {
        console.log(err);
      }
    );

    this.backendService.showDaltonicMode.subscribe(
      message => (this.daltonicMode = message)
    );
  }

  ngOnInit() {}
}
