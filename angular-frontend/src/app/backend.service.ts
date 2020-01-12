import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IBasicData } from './components/basic-data-category/basicData';

@Injectable({
  providedIn: "root"
})
export class BackendService {
  private backendUrl: string = "http://127.0.0.1:5000/";
  constructor(private http: HttpClient) {}

  postAnaliceUrl(url: string): Observable<string> {
    let data = { "url": url };
    return this.http.post<string>(`${this.backendUrl}analiceUrl`, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*'
      })
    });
  }

  getBasicData(): Observable<IBasicData>{
    return this.http.get<IBasicData>(`${this.backendUrl}basicInfo/all`);
  }
}
