import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backendUrl: 'http://localhost:5200/'
  constructor(private http: HttpClient) { }

  postAnaliceUrl(url:string){
    return this.http.post(url);
  }
}
