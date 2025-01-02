import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactLaboratoryManagementRoutingModule } from './contact-laboratory-management-routing.module';
import { ListContactLaboComponent } from './components/list-contact-labo/list-contact-labo.component';
import { EditContactLaboComponent } from './components/edit-contact-labo/edit-contact-labo.component';
import { AddContactLaboComponent } from './components/add-contact-labo/add-contact-labo.component';
import { CreateContactLaboComponent } from './components/create-contact-labo/create-contact-labo.component';
import { ListAllContactLaboComponent } from './components/list-all-contact-labo/list-all-contact-labo.component';


@NgModule({
  declarations: [


    EditContactLaboComponent,

        ListAllContactLaboComponent,


  ],
  imports: [
    CommonModule,
    ContactLaboratoryManagementRoutingModule,
    ListContactLaboComponent,
    AddContactLaboComponent,
    CreateContactLaboComponent
  ]
})
export class ContactLaboratoryManagementModule { }
