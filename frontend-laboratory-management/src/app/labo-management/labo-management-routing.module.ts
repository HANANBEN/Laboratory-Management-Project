import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { LaboListComponent } from './components/labo-list/labo-list.component';
import { LaboCreateComponent } from './components/labo-create/labo-create.component';
import { LaboEditComponent } from './components/labo-edit/labo-edit.component';

const routes: Routes = [
  { path: 'list', component: LaboListComponent },
  { path: 'edit/:id', component: LaboEditComponent },
  { path: 'create', component: LaboCreateComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboManagementRoutingModule { }
