import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LaboManagementModule} from './labo-management/labo-management.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { AdressManagementModule } from './adress-management/adress-management.module';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LaboManagementModule,
    AdressManagementModule,
    FormsModule,
    RouterModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
