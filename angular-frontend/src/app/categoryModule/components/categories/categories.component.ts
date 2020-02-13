import { Component } from "@angular/core";
import { ICategory } from "./category";
import { BasicDataCategoryComponent } from "../basic-data-category/basic-data-category.component";
import { BackendService } from "src/app/backend.service";
import { LocationCategoryComponent } from '../location-category/location-category.component';
import { EmotionCategoryComponent } from '../emotion-category/emotion-category.component';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent {
  categories: ICategory[] = [
    new BasicDataCategoryComponent(this.backendService),
    new LocationCategoryComponent(this.backendService),
    new EmotionCategoryComponent(this.backendService)
  ];

  constructor(private backendService: BackendService) {}
}
