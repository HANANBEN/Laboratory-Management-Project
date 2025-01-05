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
import {
  TechnicianDashboardComponent
} from './components/technician-dashboard-component/technician-dashboard-component.component';
import {
  PatientDashboardComponentComponent
} from './components/patient-dashboard-component/patient-dashboard-component.component';
import {AuthGuard} from '../guard/auth.guard';
import {ManageProfileComponent} from './components/manage-profile/manage-profile.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {AdminDashboardComponent} from './components/admin-dashboard-component/admin-dashboard-component.component';
import {
  ListAllUserComponent
} from './components/user-laboratory-management/components/list-all-user-labo/list-all-user-labo.component';
import {ManagePatientComponent} from './components/manage-patient/manage-patient.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Pas de chemin supplémentaire,
  { path: 'apropos', component: AproposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet' , component: ProjetComponent },
  { path: 'service' , component: ServiceComponent },
  { path: 'contact' , component: ContactComponent },
  { path: 'createaccount' , component: CreateaccountComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'technician/dashboard', component: TechnicianDashboardComponent , canActivate: [AuthGuard], data: { role: 'technicien' } },
  { path: 'patient/dashboard', component: PatientDashboardComponentComponent, canActivate: [AuthGuard], data: { role: 'patient' } },
  { path: 'manage-profile', component: ManageProfileComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'list-user', component: ListAllUserComponent},
  { path:'manage-patient', component:ManagePatientComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
