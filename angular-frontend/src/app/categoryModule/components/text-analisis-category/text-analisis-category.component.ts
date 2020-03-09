import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { IBasicData } from '../basic-data-category/basicData';

@Component({
  selector: "app-text-analisis-category",
  templateUrl: "./text-analisis-category.component.html",
  styleUrls: ["./text-analisis-category.component.scss"]
})
export class TextAnalisisCategoryComponent implements OnInit {
  title: string = "Analisis del texto";
  url: string = "/textAnalisis";
  description: string = "Analiza el texto de la noticia.";
  icon: string = "find_in_page";

  basicData: IBasicData;
  entities;
  showEntities: boolean = false;
  daltonicMode: boolean;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getBasicData().subscribe(
      data => (this.basicData = data),
      err => {
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

  changeShowEntities(param: boolean): void {
    this.showEntities = param;
  }

  highlightEntities(): string {
    if (!this.showEntities) {
      return this.basicData.text;
    }
    var text = this.basicData.text;

    this.basicData.text.split(" ").forEach(word => {
      if (
        this.entities.persons.includes(word) ||
        this.entities.organizations.includes(word) ||
        this.entities.locations.includes(word) ||
        this.entities.misc.includes(word)
      ) {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          "<b>" + word + "</b>"
        );
      }
    });

    return text;
  }
}
