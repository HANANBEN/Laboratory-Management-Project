import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExamenComponent } from './components/list-examen/list-examen.component';
import { CreateExamenComponent } from './components/create-examen/create-examen.component';
import { EditExamenComponent } from './components/edit-examen/edit-examen.component';

const routes: Routes = [
  { path: 'examens', component: ListExamenComponent },  // Route pour la liste des examens
  { path: 'create-examen', component: CreateExamenComponent },  // Route pour créer un examen
  { path: 'edit-examen/:id', component: EditExamenComponent },  // Route pour éditer un examen en fonction de son ID
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenManagementRoutingModule {}
