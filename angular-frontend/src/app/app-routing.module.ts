import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CategoriesComponent } from './categoryModule/components/categories/categories.component';
import { BasicDataCategoryComponent } from "./categoryModule/components/basic-data-category/basic-data-category.component";
import { LocationCategoryComponent } from './categoryModule/components/location-category/location-category.component';



const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "basicData", component: BasicDataCategoryComponent },
  { path: "location", component: LocationCategoryComponent },
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
