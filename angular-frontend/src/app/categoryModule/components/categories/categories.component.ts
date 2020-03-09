import { Component } from "@angular/core";
import { ICategory } from "./category";
import { BasicDataCategoryComponent } from "../basic-data-category/basic-data-category.component";
import { BackendService } from "src/app/backend.service";
import { LocationCategoryComponent } from '../location-category/location-category.component';
import { EmotionCategoryComponent } from '../emotion-category/emotion-category.component';
import { AccesibilityCategoryComponent } from '../accesibility-category/accesibility-category.component';
import { TextAnalisisCategoryComponent } from '../text-analisis-category/text-analisis-category.component';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent {
  categories: ICategory[] = [
    new BasicDataCategoryComponent(this.backendService),
    new LocationCategoryComponent(this.backendService),
    new EmotionCategoryComponent(this.backendService),
    new AccesibilityCategoryComponent(this.backendService),
    new TextAnalisisCategoryComponent(this.backendService)
  ];

  daltonicMode: boolean;

  constructor(private backendService: BackendService) {
    this.backendService.showDaltonicMode.subscribe(
      message => (this.daltonicMode = message)
    );
  }
}
