import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LaboManagementModule} from './labo-management/labo-management.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomePageRoutingModule} from './home-page/home-page-routing.module';
import {HttpClientModule} from '@angular/common/http';



import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { AdressManagementModule } from './adress-management/adress-management.module';
import { ManageProfileComponent } from './home-page/components/manage-profile/manage-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ManageProfileComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LaboManagementModule,
    AdressManagementModule,
    FormsModule,
    RouterModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
