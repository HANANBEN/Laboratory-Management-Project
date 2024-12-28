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
import { TechnicianDashboardComponentComponent } from './components/technician-dashboard-component/technician-dashboard-component.component';
import { AdminDashboardComponentComponent } from './components/admin-dashboard-component/admin-dashboard-component.component';




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
    TechnicianDashboardComponentComponent,
    AdminDashboardComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HomePageRoutingModule,

  ]
})
export class HomePageModule { }
