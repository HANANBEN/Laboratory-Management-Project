import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { AnalysisManagementRoutingModule } from './analysis-management-routing.module';
import { CreateAnalysisComponent } from './components/create-analysis/create-analysis.component';
import { EditAnalysisComponent } from './components/edit-analysis/edit-analysis.component';
@NgModule({
  declarations: [

     // Ajouter tous les composants relatifs à la gestion des analyses
  ],
  imports: [
    AnalysisListComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    CreateAnalysisComponent,
    EditAnalysisComponent,
    AnalysisManagementRoutingModule,
  ],
  providers: [],
})
export class AnalysisManagementModule {}
