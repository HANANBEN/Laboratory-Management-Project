import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpreuveListComponent } from './epreuve-list/epreuve-list.component';
import { EpreuveCreateComponent } from './epreuve-create/epreuve-create.component';
import { EpreuveUpdateComponent } from './epreuve-update/epreuve-update.component';
import { EpreuveDetailsComponent } from './epreuve-details/epreuve-details.component'; // Optional
import { EpreuveDeleteComponent } from './epreuve-delete/epreuve-delete.component'; // Optional

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // Default route
  { path: 'list', component: EpreuveListComponent },
  { path: 'create', component: EpreuveCreateComponent },
  { path: 'update/:id', component: EpreuveUpdateComponent },
  { path: 'details/:id', component: EpreuveDetailsComponent }, // Optional
  { path: 'delete/:id', component: EpreuveDeleteComponent }, // Optional
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpreuveManagementRoutingModule {}
