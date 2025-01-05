import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomePageRoutingModule} from './home-page-routing.module';
import { AproposComponent } from './components/apropos/apropos.component';
import { LoginComponent } from './components/login/login.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateaccountComponent } from './components/createaccount/createaccount.component';
import { RouterModule } from '@angular/router';
import { PatientDashboardComponentComponent } from './components/patient-dashboard-component/patient-dashboard-component.component';
import { TechnicianDashboardComponent } from './components/technician-dashboard-component/technician-dashboard-component.component';
import { AdminDashboardComponent} from './components/admin-dashboard-component/admin-dashboard-component.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserLaboratoryManagementComponent } from './components/user-laboratory-management/user-laboratory-management.component';




@NgModule({
  declarations: [
    HomeComponent,
    AproposComponent,
    LoginComponent,
    ProjetComponent,
    ServiceComponent,
    ContactComponent,
    CreateaccountComponent,
    PatientDashboardComponentComponent,
    TechnicianDashboardComponent,
    AdminDashboardComponent,
    ResetPasswordComponent,
    UserLaboratoryManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HomePageRoutingModule,

  ]
})
export class HomePageModule { }
