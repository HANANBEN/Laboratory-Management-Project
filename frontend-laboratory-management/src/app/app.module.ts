import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LaboManagementModule} from './labo-management/labo-management.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomePageRoutingModule} from './home-page/home-page-routing.module';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LaboManagementModule,
    FormsModule,
    RouterModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
