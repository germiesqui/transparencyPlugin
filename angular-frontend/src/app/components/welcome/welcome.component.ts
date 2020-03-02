import { Component } from "@angular/core";
import { BackendService } from "src/app/backend.service";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { Observable } from 'rxjs';

// declare var chrome;

@Component({
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
  url: string;
  currentUrl: string;
  title: string = "Bienvenido a Transparency Plugin";
  introductionText: string =
    "Transparency Plugin es una herramienta que permite analizar noticias presentando " +
    "datos sobre la misma que no son visibles a simple vista. Además, brinda accesibilidad " +
    "a la noticia otorgando modos de visualización aptos para gente con dificultades visuales.";
  postError = false;
  postErrorMessage = "";

  daltonicMode: boolean;

  constructor(private backendService: BackendService, private router: Router, private store: Store<State>) {
    // if (chrome) {
    //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    //     this.currentUrl = tabs[0].url;
    //   });
    // }

    //this.daltonicMode = store.pipe(select(state => state.showDaltonicMode));

    this.backendService.showDaltonicMode.subscribe(
      message => (this.daltonicMode = message)
    );
  }

  buttonClick(url: string) {
    this.backendService.postAnaliceUrl(url).subscribe({
      next: () => {
        this.router.navigate(["./categories"]);
      },
      error: err => {
        console.log(err.error)
        this.postError = true;
        err.status < 500
          ? (this.postErrorMessage = "URL inválida")
          : (this.postErrorMessage = "Error inesperado en el servidor");
      }
    });
  }

  onSubmit(): void {
    this.buttonClick(this.url);
  }

  onClick(): void {
    this.buttonClick(this.currentUrl);
  }

  checkChanged(value: boolean): void{
    this.backendService.changeMessage(value);
    // this.store.dispatch({
    //   type: 'TOGGLE_DALTONIC_MODE',
    //   payload: value
    // });
  }
}
