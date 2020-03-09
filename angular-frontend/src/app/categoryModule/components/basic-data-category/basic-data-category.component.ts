import { Component } from "@angular/core";
import { IBasicData } from "./basicData";
import { ICategory } from "../categories/category";
import { BackendService } from "src/app/backend.service";

@Component({
  selector: "app-basic-data-category",
  templateUrl: "./basic-data-category.component.html",
  styleUrls: ["./basic-data-category.component.scss"]
})
export class BasicDataCategoryComponent implements ICategory {
  // Category Data
  title: string = "Datos Básicos";
  url: string = "/basicData";
  description: string = "Datos básicos sobre la noticia.";
  icon: string = "info";

  basicData: IBasicData;
  option = "image";
  entities;

  getError: boolean = false;
  options = { autoHide: false, scrollbarMinSize: 100 };

  daltonicMode: boolean;

  constructor(private backendService: BackendService) {
    this.backendService.getBasicData().subscribe(
      data => (this.basicData = data),
      err => {
        this.getError = true;
        console.log(err);
      }
    );

    this.backendService.showDaltonicMode.subscribe(
      message => (this.daltonicMode = message)
    );

    this.backendService.getEntities().subscribe(
      data => (this.entities = data),
      err => {
        console.log(err);
      }
    );
  }

  infoChange(param: string): void {
    this.option = param;
  }
}
