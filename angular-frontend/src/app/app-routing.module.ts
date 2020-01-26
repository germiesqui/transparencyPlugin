import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CategoriesComponent } from './categories/components/categories/categories.component';
import { BasicDataCategoryComponent } from "./categories/components/basic-data-category/basic-data-category.component";



const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "basicData", component: BasicDataCategoryComponent },
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
