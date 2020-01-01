import { Component, OnInit, Input } from '@angular/core';
import { IBasicData } from './basicData';
import { ICategory } from '../categories/category';

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
  
  //@Input() basicData: IBasicData
  basicData: IBasicData = {
    authors: ['pedro', 'juan', 'jorge'],
    publishDate: new Date(),
    keywords: ['as', 'bs', 'cs'],
    summary: 'prueba 1',
    text: 'prueba 2',
    topImg: new URL("http://www.google.es"),
    movies: [new URL("http://www.google.es"), new URL("http://www.google.ch")]
  }
  constructor() { }

  ngOnInit() {
  }

}
