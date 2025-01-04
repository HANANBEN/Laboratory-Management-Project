import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDossierComponent } from './components/list-dossier/list-dossier.component';
import { CreateDossierComponent } from './components/create-dossier/create-dossier.component';
import { EditDossierComponent } from './components/edit-dossier/edit-dossier.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // Redirige vers la liste par défaut
  { path: 'list', component: ListDossierComponent }, // Route pour la liste des dossiers
  { path: 'create', component: CreateDossierComponent }, // Route pour la création d'un dossier
  { path: 'edit/:numDossier', component: EditDossierComponent }, // Route pour l'édition d'un dossier spécifique
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierManagementRoutingModule {}
