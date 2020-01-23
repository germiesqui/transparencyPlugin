import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { SimplebarAngularModule } from "simplebar-angular";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { HttpClientModule } from "@angular/common/http";
import { BasicDataCategoryComponent } from "./components/basic-data-category/basic-data-category.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CategoriesComponent,
    BasicDataCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    SimplebarAngularModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
