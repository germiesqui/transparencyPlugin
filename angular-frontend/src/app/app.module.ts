import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { HttpClientModule } from "@angular/common/http";
import { BasicDataCategoryComponent } from './components/basic-data-category/basic-data-category.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, CategoriesComponent, BasicDataCategoryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
