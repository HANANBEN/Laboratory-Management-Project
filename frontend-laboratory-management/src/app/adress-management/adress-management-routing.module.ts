import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressHomeComponent } from './components/adress-home/adress-home.component';
import { AdressListComponent } from './components/adress-list/adress-list.component';

const routes: Routes = [
  { path: '', component: AdressHomeComponent },
  { path: 'list', component: AdressListComponent }, // Ajoutez cette route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdressManagementRoutingModule {}
