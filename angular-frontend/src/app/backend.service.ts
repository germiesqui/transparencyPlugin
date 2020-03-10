import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { IBasicData } from "./categoryModule/components/basic-data-category/basicData";
import { ILocation } from "./categoryModule/components/location-category/location";
import { IEmotion } from "./categoryModule/components/emotion-category/emotion";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  private backendUrl: string = "http://127.0.0.1:5000/";

  private messageSource = new BehaviorSubject(false);
  showDaltonicMode = this.messageSource.asObservable();

  private newsUrl = '';

  constructor(private http: HttpClient) {}

  changeDaltonicMode(message: boolean) {
    this.messageSource.next(message);
  }

  postAnaliceUrl(url: string): Observable<string> {
    let data = { url: url };
    this.newsUrl = url;

    return this.http.post<string>(`${this.backendUrl}analiceUrl`, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "angular"
      })
    });
  }

  getBasicData(): Observable<IBasicData> {
    return this.http.post<IBasicData>(
      `${this.backendUrl}basicInfo/all`,
      { url: this.newsUrl },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "angular",
          "crossorigin": "anonymous"
        })
      }
    );
  }

  getLocations(): Observable<ILocation> {
    return this.http.post<ILocation>(
      `${this.backendUrl}spacy/locations`,
      { url: this.newsUrl },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "angular",
          "crossorigin": "anonymous"
        })
      }
    );
  }

  getEmotions(): Observable<IEmotion> {
    return this.http.post<IEmotion>(
      `${this.backendUrl}emotion`,
      { url: this.newsUrl },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "angular",
          "crossorigin": "anonymous"
        })
      }
    );
  }

  getEntities(): Observable<{
    persons: string[];
    organizations: string[];
    locations: string[];
    misc: string[];
  }> {
    return this.http.post<{
      persons: string[];
      organizations: string[];
      locations: string[];
      misc: string[];
    }>(
      `${this.backendUrl}spacy/all`,
      {
        url: this.newsUrl
      },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "angular",
          "crossorigin": "anonymous"
        })
      }
    );
  }
}
