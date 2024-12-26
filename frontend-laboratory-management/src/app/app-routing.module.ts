import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LaboCreateComponent} from './labo-management/components/labo-create/labo-create.component';

const routes: Routes = [
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
