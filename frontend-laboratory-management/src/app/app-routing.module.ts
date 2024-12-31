import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Chargement paresseux des modules principaux
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },

  {path: 'contact-laboratories', loadChildren: () => import('./contact-laboratory-management/contact-laboratory-management.module').then((m) => m.ContactLaboratoryManagementModule),},
  {path: 'adress', loadChildren: () => import('./adress-management/adress-management.module').then((m) => m.AdressManagementModule),},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
