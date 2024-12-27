import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressHomeComponent } from './components/adress-home/adress-home.component';
import { AdressListComponent } from './components/adress-list/adress-list.component';
import { AdressCreateComponent } from './components/adress-create/adress-create.component';
import { AdressEditComponent } from './components/adress-edit/adress-edit.component';

const routes: Routes = [
  { path: '', component: AdressHomeComponent }, // Page d'accueil des adresses
  { path: 'list', component: AdressListComponent }, // Liste des adresses
  { path: 'create', component: AdressCreateComponent }, // Création d'une adresse
  { path: 'edit/:id', component: AdressEditComponent } // Édition d'une adresse
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdressManagementRoutingModule {}
