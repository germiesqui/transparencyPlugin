import { Component } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular-frontend";
  
  daltonicMode: boolean;

  constructor(private backendService: BackendService) {
    this.backendService.showDaltonicMode.subscribe(
      message => (this.daltonicMode = message)
    );
  }
}
