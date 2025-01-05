import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { CreateAnalysisComponent } from './components/create-analysis/create-analysis.component';
import { EditAnalysisComponent } from './components/edit-analysis/edit-analysis.component'; // Import du composant d'édition

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // Redirige vers la liste par défaut
  { path: 'list', component: AnalysisListComponent }, // Route pour la liste des analyses
  { path: 'create', component: CreateAnalysisComponent }, // Route pour la création d'une analyse
  { path: 'edit/:id', component: EditAnalysisComponent }, // Route pour l'édition d'une analyse
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisManagementRoutingModule {}
