import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { AnalysisManagementRoutingModule } from './analysis-management-routing.module';

@NgModule({
  declarations: [

     // Ajouter tous les composants relatifs à la gestion des analyses
  ],
  imports: [
    AnalysisListComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    AnalysisManagementRoutingModule,
  ],
  providers: [],
})
export class AnalysisManagementModule {}
