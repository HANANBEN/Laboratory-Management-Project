import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import {CreateAnalysisComponent} from './components/create-analysis/create-analysis.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // Redirige vers la liste par défaut
  { path: 'list', component: AnalysisListComponent },
  { path: 'create', component: CreateAnalysisComponent },// Route pour la liste des analyses

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisManagementRoutingModule {}
