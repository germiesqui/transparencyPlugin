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
  imgSrc: string =
    "https://www.google.com/search?q=logo&safe=off&sxsrf=ACYBGNSUYVjldXu6pSvh8AtYOfB-cZH3tA:1578758171411&tbm=isch&source=iu&ictx=1&fir=QeC1lGV7fHDsfM%253A%252CoRx6G8qWHugOeM%252C_&vet=1&usg=AI4_-kS5atSC4k9AbBvVrABQdHunlHIAzQ&sa=X&ved=2ahUKEwj80vi_9PvmAhVFyhoKHUX8C5YQ9QEwAHoECAoQBA&cshid=1578758182119532#imgrc=QeC1lGV7fHDsfM";
  imgWtht: number;
  imgHght: number;
  imgAlt: string = "Basic information Image";

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
