import { Component, OnInit, Input } from '@angular/core';
import { IBasicData } from './basicData';
import { ICategory } from '../categories/category';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-basic-data-category',
  templateUrl: './basic-data-category.component.html',
  styleUrls: ['./basic-data-category.component.scss']
})
export class BasicDataCategoryComponent implements OnInit, ICategory {
  // Category Data
  title: string = 'Basic Data';
  url: string = 'basicData';
  description: string = 'Basic information of the article';
  imgSrc: string;
  imgWtht: number;
  imgHght: number;
  imgAlt: string = 'Basic information Image';
  
  basicData: IBasicData
  
  constructor(private backendService: BackendService) { 
    this.backendService.getBasicData()
      .subscribe(data => this.basicData = data,
                err => console.log(err));
  }

  ngOnInit() {
  }

}
