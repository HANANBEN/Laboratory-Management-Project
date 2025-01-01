import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListContactLaboComponent} from './components/list-contact-labo/list-contact-labo.component';
import {AddContactLaboComponent} from './components/add-contact-labo/add-contact-labo.component';
import {CreateContactLaboComponent} from './components/create-contact-labo/create-contact-labo.component';
import {ListAllContactLaboComponent} from './components/list-all-contact-labo/list-all-contact-labo.component';

const routes: Routes = [
  {
    path: 'contacts/:labId',
    component: ListContactLaboComponent,
  },

  { path: 'add-contact-labo', component: AddContactLaboComponent },  // Define the path for the component
  { path: 'add-contact-labo/:labId', component: AddContactLaboComponent },
  { path: 'create-contact-labo', component: CreateContactLaboComponent },
  { path: 'list-all-contacts', component: ListAllContactLaboComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactLaboratoryManagementRoutingModule { }
