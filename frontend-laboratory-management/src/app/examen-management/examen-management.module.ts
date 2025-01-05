import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListExamenComponent } from './components/list-examen/list-examen.component';
import { ExamenManagementRoutingModule } from './examen-management-routing.module';
import { CreateExamenComponent } from './components/create-examen/create-examen.component';
import { EditExamenComponent } from './components/edit-examen/edit-examen.component';

@NgModule({
  declarations: [
     // Liste des examens
     // Composant pour éditer un examen
  ],
  imports: [
    CreateExamenComponent,  // Composant pour créer un examen
    EditExamenComponent,
    ListExamenComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ExamenManagementRoutingModule,  // Gestion de la route
  ],
  providers: [],
})
export class ExamenManagementModule {}
