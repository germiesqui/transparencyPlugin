import { Component, OnInit } from '@angular/core';
import { ICategory } from "./category";
import { BasicDataCategoryComponent } from '../basic-data-category/basic-data-category.component';
import { BackendService } from 'src/app/backend.service';
import { IBasicData } from '../basic-data-category/basicData';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories:  ICategory[] = [new BasicDataCategoryComponent];
  property: IBasicData;
  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  clickEvent(event){
    this.backendService.getBasicData()
      .subscribe(data => this.property = data,
                err => console.log(err),
                () => console.log(this.property));
    
  }
}
