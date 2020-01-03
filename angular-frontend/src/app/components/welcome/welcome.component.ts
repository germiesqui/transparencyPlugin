import { Component, OnInit } from "@angular/core";
import { BackendService } from "src/app/backend.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  private url: string;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit() {}

  sendUrl(): void {
    this.backendService.postAnaliceUrl(this.url).subscribe({
      next: url => {
        console.log(url);
        this.router.navigate(["./categories"]);
      },
      error: err => {
        console.log('error');
        
      }
    });
    
  }
}
