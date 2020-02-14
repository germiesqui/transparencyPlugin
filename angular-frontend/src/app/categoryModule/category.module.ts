import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { ChartsModule } from "ng2-charts";

// Components
import { CategoriesComponent } from "./components/categories/categories.component";
import { BasicDataCategoryComponent } from "./components/basic-data-category/basic-data-category.component";
import { LocationCategoryComponent } from "./components/location-category/location-category.component";
import { EmotionCategoryComponent } from "./components/emotion-category/emotion-category.component";
import { RadarChartComponent } from "./components/radar-chart/radar-chart.component";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";

// Styles
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SimplebarAngularModule } from "simplebar-angular";
import { MatCardModule } from "@angular/material/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CategoriesComponent,
    BasicDataCategoryComponent,
    LocationCategoryComponent,
    EmotionCategoryComponent,
    RadarChartComponent,
    BarChartComponent
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
    MatCardModule,
    ChartsModule,
    FontAwesomeModule
  ]
})
export class CategoryModule {}
