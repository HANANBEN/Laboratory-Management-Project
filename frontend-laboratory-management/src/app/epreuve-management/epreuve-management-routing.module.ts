import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EpreuveCreateComponent} from './components/epreuve-create/epreuve-create.component';
import {ListAllEpreuveComponent} from './components/list-all-epreuve/list-all-epreuve.component';
import {EditEpreuveComponent} from './components/edit-epreuve/edit-epreuve.component';

const routes: Routes = [

  { path: 'create', component: EpreuveCreateComponent },
  { path: 'list', component: ListAllEpreuveComponent },
  { path: 'edit/:id', component: EditEpreuveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpreuveManagementRoutingModule {}
