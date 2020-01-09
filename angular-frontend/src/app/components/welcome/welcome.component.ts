import { Component, OnInit } from "@angular/core";
import { BackendService } from "src/app/backend.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  url: string;
  postError = false;
  postErrorMessage = "";

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit() {}

  onSubmit(): void {
    this.backendService.postAnaliceUrl(this.url).subscribe({
      next: () => {
        this.router.navigate(["./categories"]);
      },
      error: err => {
        this.postError = true;
        err.status < 500
          ? (this.postErrorMessage = err.error)
          : (this.postErrorMessage = "Error inesperado en el servidor");
      }
    });
  }
}
