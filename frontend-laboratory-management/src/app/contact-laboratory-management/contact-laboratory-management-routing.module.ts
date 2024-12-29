import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListContactLaboComponent} from './components/list-contact-labo/list-contact-labo.component';

const routes: Routes = [
  {
    path: 'contacts/:labId',
    component: ListContactLaboComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactLaboratoryManagementRoutingModule { }
