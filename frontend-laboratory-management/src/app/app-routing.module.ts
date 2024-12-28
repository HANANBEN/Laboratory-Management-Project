import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressHomeComponent } from './adress-management/components/adress-home/adress-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/addresses', pathMatch: 'full' }, // Redirection par défaut
  { path: 'addresses', loadChildren: () => import('./adress-management/adress-management.module').then(m => m.AdressManagementModule) },
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
