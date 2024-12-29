import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressHomeComponent } from './components/adress-home/adress-home.component';
import { AdressListComponent } from './components/adress-list/adress-list.component';

const routes: Routes = [
<<<<<<< HEAD
  { path: '', component: AdressHomeComponent },
  { path: 'list', component: AdressListComponent }, // Ajoutez cette route
=======
  { path: 'home', component: AdressHomeComponent }, // Page d'accueil des adresses
  { path: 'list', component: AdressListComponent }, // Liste des adresses
  { path: 'create', component: AdressCreateComponent }, // Création d'une adresse
  { path: 'edit/:id', component: AdressEditComponent } // Édition d'une adresse
>>>>>>> cf32f206826e576cb84e3df9900e691786a6b6f5
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdressManagementRoutingModule {}
