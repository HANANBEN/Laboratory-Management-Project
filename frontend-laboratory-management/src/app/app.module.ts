import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaboManagementModule } from './labo-management/labo-management.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from './home-page/home-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdressManagementModule } from './adress-management/adress-management.module';

// Import du module AnalysisManagement
import { AnalysisManagementModule } from './analysis-management/analysis-management.module';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {DossierManagementModule} from './dossier-management/dossier-management.module';
import {ExamenManagementModule} from './examen-management/examen-management.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LaboManagementModule,
    AdressManagementModule,
    ExamenManagementModule,
    FormsModule,
    RouterModule,
    HomePageRoutingModule,
    HttpClientModule,
    // Ajout du module AnalysisManagement
    AnalysisManagementModule,
    DossierManagementModule,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
