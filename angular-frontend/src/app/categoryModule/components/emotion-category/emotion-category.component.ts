import { Component } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { IEmotion } from './emotion';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-emotion-category",
  templateUrl: "./emotion-category.component.html",
  styleUrls: ["./emotion-category.component.scss"]
})
export class EmotionCategoryComponent {
  // Category Data
  title: string = "Análisis Emocional";
  url: string = "/emotion";
  description: string = "Análisis de carga emocional en la noticia.";
  icon: string = "tag_faces";

  loading: boolean = true;

  //Page Info
  emotionInfo: string =
    "En este gráfico se ven representadas 10 emociones presentes en el texto." +
    "Las puntuaciones sobre cada emoción han sido realizadas contando el número " +
    "de palabras significativas presentes en el texto mediante un lexicon.";
  sentimentInfo: string =
    "En este gráfico se ven representados la polaridad y la subjetividad del texto." +
    " La polaridad, representada con valores de -1 a 1, indica la tendencia del texto " +
    "a hablar a favor, o en contra de una idea.\nLa subjetividad, representada con valores" +
    "de 0 a 1, indica la presencia de lexico subjetivo en el texto.";

  // Warning data
  warning: boolean;
  warningIcon = faExclamationTriangle;
  warningText: string =
    "Esta noticia contiene un alto grado de subjetividad. La información mostrada en dicha " +
    "noticia puede estar alterada de manera intencionada.";

  //Emotion Graphs
  emotions: IEmotion;
  emotionNames: string[] = ["default"];
  emotionData: number[] = [1];
  RadarChartlabel: string = "Emociones";

  sentimentLabels: string[] = ["Polaridad", "Subjetividad"];
  sentimentData: number[] = [0, 0];

  //Color code. Positive = red to green, Negative = green to red
  polarityColorCode: number = 1;
  subjetivityColorCode: number = -1;

  daltonicMode: boolean;

  constructor(private backendService: BackendService) {
    this.backendService.getEmotions().subscribe(
      data => {
        this.emotions = data;
        this.emotionNames = Object.keys(data.emotion);
        this.emotionData = Object.keys(data.emotion).map(
          key => data.emotion[key]
        );

        this.sentimentData = [
          ((+data.polarity.toFixed(2) + 1) / 2),
          +data.subjectivity.toFixed(2)
        ];

        this.warning = data.warning;

        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );

    this.backendService.showDaltonicMode.subscribe(
      message => (this.daltonicMode = message)
    );
  }
}
