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
import { HighchartsChartModule } from "highcharts-angular";
import { SpiderwebChartComponent } from "./components/spiderweb-chart/spiderweb-chart.component";
import { SolidgaugeChartComponent } from "./components/solidgauge-chart/solidgauge-chart.component";

// Styles
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SimplebarAngularModule } from "simplebar-angular";
import { MatCardModule } from "@angular/material/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SatisfactionIconsComponent } from './components/satisfaction-icons/satisfaction-icons.component';
import { AccesibilityCategoryComponent } from './components/accesibility-category/accesibility-category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    BasicDataCategoryComponent,
    LocationCategoryComponent,
    EmotionCategoryComponent,
    SpiderwebChartComponent,
    SolidgaugeChartComponent,
    SatisfactionIconsComponent,
    AccesibilityCategoryComponent
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
    FontAwesomeModule,
    HighchartsChartModule
  ]
})
export class CategoryModule {}
