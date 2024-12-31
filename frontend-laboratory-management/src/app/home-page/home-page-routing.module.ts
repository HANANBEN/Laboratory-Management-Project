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
import {AdminDashboardComponentComponent} from './components/admin-dashboard-component/admin-dashboard-component.component';
import {
  TechnicianDashboardComponentComponent
} from './components/technician-dashboard-component/technician-dashboard-component.component';
import {
  PatientDashboardComponentComponent
} from './components/patient-dashboard-component/patient-dashboard-component.component';
import {AuthGuard} from '../guard/auth.guard';
import {ManageProfileComponent} from './components/manage-profile/manage-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Pas de chemin supplémentaire,
  { path: 'apropos', component: AproposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet' , component: ProjetComponent },
  { path: 'service' , component: ServiceComponent },
  { path: 'contact' , component: ContactComponent },
  { path: 'createaccount' , component: CreateaccountComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponentComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'technician/dashboard', component: TechnicianDashboardComponentComponent , canActivate: [AuthGuard], data: { role: 'technicien' } },
  { path: 'patient/dashboard', component: PatientDashboardComponentComponent, canActivate: [AuthGuard], data: { role: 'patient' } },
  { path: 'manage-profile', component: ManageProfileComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
