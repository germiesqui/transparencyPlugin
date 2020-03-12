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

  disabled:boolean = true; 

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
      data => {
        this.entities = data;
        this.disabled = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  changeShowEntities(param: boolean): void {
    if (this.entities) {
      this.showEntities = param;
    } else {
      this.showEntities = false;
    }
  }

  highlightEntities(): string {
    if (!this.showEntities) {
      return this.basicData.text;
    }

    var text = this.basicData.text;
    if (!this.daltonicMode) {
      this.entities.persons.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          '<div class="entity person"><span>' +
            word +
            "</span><div class='ent-category'><span>PERSON</span></div></div>"
        );
      });

      this.entities.organizations.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          '<div class="entity org"><span>' +
            word +
            "</span><div class='ent-category'><span>ORG</span></div></div>"
        );
      });

      this.entities.locations.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          "<div class='entity loc'><span>" +
            word +
            "</span><div class='ent-category'><span>LOC</span></div></div>"
        );
      });

      this.entities.misc.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          "<div class='entity misc'><span>" +
            word +
            "</span><div class='ent-category'><span>MISC</span></div></div>"
        );
      });
      return text;
    }else{
      this.entities.persons.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          '<div class="entity person daltonic-message"><span>' +
            word +
            "</span><div class='ent-category'><span>PERSON</span></div></div>"
        );
      });

      this.entities.organizations.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          '<div class="entity org daltonic-message"><span>' +
            word +
            "</span><div class='ent-category'><span>ORG</span></div></div>"
        );
      });

      this.entities.locations.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          "<div class='entity loc daltonic-message'><span>" +
            word +
            "</span><div class='ent-category'><span>LOC</span></div></div>"
        );
      });

      this.entities.misc.forEach(word => {
        text = text.replace(
          RegExp("\\b" + word + "\\b", "g"),
          "<div class='entity misc daltonic-message'><span>" +
            word +
            "</span><div class='ent-category'><span>MISC</span></div></div>"
        );
      });
      return text;  
    }
  }
    
}
