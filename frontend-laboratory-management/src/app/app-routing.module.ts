import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'laboratories',
    loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule),
  },
  {
    path: 'contact-laboratories',
    loadChildren: () => import('./contact-laboratory-management/contact-laboratory-management.module').then(m => m.ContactLaboratoryManagementModule),
  },
  {
    path: 'adress', // Corrected from 'adress' to 'address'
    loadChildren: () => import('./adress-management/adress-management.module').then(m => m.AdressManagementModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'analyses', // Nouvelle route pour analysis-management
    loadChildren: () => import('./analysis-management/analysis-management.module').then(m => m.AnalysisManagementModule),
  },
  {
    path: 'dossiers', // Nouvelle route pour dossier-management
    loadChildren: () => import('./dossier-management/dossier-management.module').then(m => m.DossierManagementModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
