import { Component, OnInit } from '@angular/core';
import { IBasicData } from './basicData';
import { ICategory } from '../categories/category';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: "app-basic-data-category",
  templateUrl: "./basic-data-category.component.html",
  styleUrls: ["./basic-data-category.component.scss"]
})
export class BasicDataCategoryComponent implements OnInit, ICategory {
  // Category Data
  title: string = "Basic Data";
  url: string = "basicData";
  description: string = "Basic information of the article";
  icon: string = "description";

  basicData: IBasicData;

  getError: boolean = false;

  constructor(private backendService: BackendService) {
    this.backendService.getBasicData().subscribe(
      data => (this.basicData = data),
      err => {
        this.getError = true;
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
