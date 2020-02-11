import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { IEmotion } from './emotion';

@Component({
  selector: "app-emotion-category",
  templateUrl: "./emotion-category.component.html",
  styleUrls: ["./emotion-category.component.scss"]
})
export class EmotionCategoryComponent implements OnInit {
  // Category Data
  title: string = "Análisis Emocional";
  url: string = "/emotion";
  description: string = "Datos básicos sobre la noticia.";
  icon: string = "info";

  //Page Info
  emotionInfo: string = 'En este gráfico se ven representadas 10 emociones presentes en el texto.'+
                        'Las puntuaciones sobre cada emoción han sido realizadas contando el número '+
                        'de palabras significativas presentes en el texto mediante un lexicon.';
  sentimentInfo: string = 'En este gráfico se ven representados la polaridad y la subjetividad del texto.'+
                          ' La polaridad, representada con valores de -1 a 1, indica la tendencia del texto '+
                          'a hablar a favor, o en contra de una idea.\nLa subjetividad, representada con valores'+
                          'de 0 a 1, indica la presencia de lexico subjetivo en el texto.';

  warning: boolean;
  warningText: string = 'Esta noticia contiene un alto grado de subjetividad. La información mostrada en dicha '+
                        'noticia puede estar alterada de manera intencionada.'

  //Emotion Graphs
  emotions: IEmotion;
  emotionNames: string[] = ["default"];
  emotionData: number[] = [1];
  RadarChartlabel: string = "emociones";

  sentimentLabels: string[] = ['Polaridad', 'Subjetividad'];
  sentimentData: number[] = [0,0];
  BarChartlabel: string = "Sentimientos";

  constructor(private backendService: BackendService) {
    this.backendService.getEmotions().subscribe(
      data => {
        this.emotions = data;
        this.emotionNames = Object.keys(data.emotion);
        this.emotionData = Object.keys(data.emotion).map(
          key => data.emotion[key]
        );
        this.sentimentData = [data.polarity, data.subjectivity];
        this.warning = data.warning;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
