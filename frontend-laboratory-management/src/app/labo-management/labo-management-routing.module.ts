import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { LaboListComponent } from './components/labo-list/labo-list.component';
import { LaboCreateComponent } from './components/labo-create/labo-create.component';
import { LaboEditComponent } from './components/labo-edit/labo-edit.component';
import { LaboViewComponent } from './components/labo-view/labo-view.component';

const routes: Routes = [
  { path: 'list', component: LaboListComponent },

  { path: 'laboratories/edit/:id', component: LaboEditComponent },
  { path: 'laboratories/create', component: LaboCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboManagementRoutingModule { }
