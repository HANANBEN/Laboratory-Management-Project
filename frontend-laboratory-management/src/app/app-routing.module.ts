import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Chargement paresseux des modules principaux
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },

  // Redirection par défaut
  {path: 'contact-laboratories', loadChildren: () => import('./contact-laboratory-management/contact-laboratory-management.module').then((m) => m.ContactLaboratoryManagementModule),},
  {path: 'adress', loadChildren: () => import('./adress-management/adress-management.module').then((m) => m.AdressManagementModule),},


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

    path: 'epreuves', // Nouvelle route pour epreuve-management
    loadChildren: () => import('./epreuve-management/epreuve-management.module').then(m => m.EpreuveManagementModule)
  },
  {
    path: 'dossiers', // Nouvelle route pour dossier-management
    loadChildren: () => import('./dossier-management/dossier-management.module').then(m => m.DossierManagementModule),
  },
  {
    path: 'examens', // Nouvelle route pour examen-management
    loadChildren: () => import('./examen-management/examen-management.module').then(m => m.ExamenManagementModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
