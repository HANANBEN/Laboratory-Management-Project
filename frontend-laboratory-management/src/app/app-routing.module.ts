import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AproposComponent} from './home-page/components/apropos/apropos.component';
import {LoginComponent} from './home-page/components/login/login.component';
import {ProjetComponent} from './home-page/components/projet/projet.component';
import {ServiceComponent} from './home-page/components/service/service.component';
import {ContactComponent} from './home-page/components/contact/contact.component';
import {CreateaccountComponent} from './home-page/components/createaccount/createaccount.component';

const routes: Routes = [
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers '/home'
  { path: '**', redirectTo: '/home' }, // Redirection par défaut en cas de route non définie
  { path: 'apropos' , component: AproposComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'projet' , component: ProjetComponent },
  { path: 'service' , component: ServiceComponent },
  { path: 'contact' , component: ContactComponent },
  { path: 'createaccount' , component: CreateaccountComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
