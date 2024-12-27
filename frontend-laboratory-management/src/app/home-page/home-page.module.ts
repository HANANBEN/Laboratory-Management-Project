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



@NgModule({
  declarations: [
    HomeComponent,
    AproposComponent,
    LoginComponent,
    ProjetComponent,
    ServiceComponent,
    ContactComponent,
    CreateaccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HomePageRoutingModule,

  ]
})
export class HomePageModule { }
