import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdressHomeComponent} from './adress-management/components/adress-home/adress-home.component';


const routes: Routes = [
  { path: '', component: AdressHomeComponent },
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  {path: 'contact-laboratories', loadChildren: () => import('./contact-laboratory-management/contact-laboratory-management.module').then((m) => m.ContactLaboratoryManagementModule),},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
