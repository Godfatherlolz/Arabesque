import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
 {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, 
  {
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full',
  }, ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
