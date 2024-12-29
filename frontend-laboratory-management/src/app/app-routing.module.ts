import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdressHomeComponent } from './adress-management/components/adress-home/adress-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/addresses', pathMatch: 'full' }, // Redirection par défaut
  { path: 'addresses', loadChildren: () => import('./adress-management/adress-management.module').then(m => m.AdressManagementModule) },
  { path: 'analysis-management', loadChildren: () => import('../analysis-management/analysis-management.module').then(m => m.AnalysisManagementModule) },
  { path: 'analysis-management', loadChildren: () => import('./analysis-management/analysis-management.module').then(m => m.AnalysisManagementModule) },
import {AdressHomeComponent} from './adress-management/components/adress-home/adress-home.component';



const routes: Routes = [
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  {path: 'contact-laboratories', loadChildren: () => import('./contact-laboratory-management/contact-laboratory-management.module').then((m) => m.ContactLaboratoryManagementModule),},
  {path: 'adress', loadChildren: () => import('./adress-management/adress-management.module').then((m) => m.AdressManagementModule),},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
