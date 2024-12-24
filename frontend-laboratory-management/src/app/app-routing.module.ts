import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  { path: '', redirectTo: 'laboratories/list', pathMatch: 'full' }, // Redirect root to laboratory list

  { path: '**', redirectTo: 'laboratories/list' } // Redirect invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
