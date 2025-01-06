import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressListComponent } from './components/adress-list/adress-list.component';
import {AdressCreateComponent} from './components/adress-create/adress-create.component';
import {AdressEditComponent} from './components/adress-edit/adress-edit.component';

const routes: Routes = [
  { path: 'list', component: AdressListComponent }, // Ajoutez cette route
  { path: 'create', component: AdressCreateComponent }, // Création d'une adresse
  { path: 'edit/:id', component: AdressEditComponent } // Édition d'une adresse
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdressManagementRoutingModule {}
