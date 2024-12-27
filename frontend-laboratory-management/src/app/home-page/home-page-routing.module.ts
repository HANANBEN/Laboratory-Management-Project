import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { HomeComponent } from './components/home/home.component';
import {AproposComponent} from './components/apropos/apropos.component';
import {LoginComponent} from './components/login/login.component';
import {ProjetComponent} from './components/projet/projet.component';
import {ServiceComponent} from './components/service/service.component';
import {ContactComponent} from './components/contact/contact.component';
import {CreateaccountComponent} from './components/createaccount/createaccount.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Pas de chemin supplémentaire,
  { path: 'apropos', component: AproposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet' , component: ProjetComponent },
  { path: 'service' , component: ServiceComponent },
  { path: 'contact' , component: ContactComponent },
  { path: 'createaccount' , component: CreateaccountComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
