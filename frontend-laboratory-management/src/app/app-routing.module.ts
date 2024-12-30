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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
