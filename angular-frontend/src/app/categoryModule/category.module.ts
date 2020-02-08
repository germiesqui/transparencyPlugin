import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { CategoriesComponent } from "./components/categories/categories.component";
import { BasicDataCategoryComponent } from "./components/basic-data-category/basic-data-category.component";
import { LocationCategoryComponent } from "./components/location-category/location-category.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SimplebarAngularModule } from "simplebar-angular";
import { MatCardModule } from "@angular/material/card";
import { EmotionCategoryComponent } from './components/emotion-category/emotion-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    BasicDataCategoryComponent,
    LocationCategoryComponent,
    EmotionCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    SimplebarAngularModule,
    MatCardModule
  ]
})
export class CategoryModule {}
