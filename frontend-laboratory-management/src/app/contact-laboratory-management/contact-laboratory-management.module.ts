import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactLaboratoryManagementRoutingModule } from './contact-laboratory-management-routing.module';
import { ListContactLaboComponent } from './components/list-contact-labo/list-contact-labo.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ContactLaboratoryManagementRoutingModule,
    ListContactLaboComponent
  ]
})
export class ContactLaboratoryManagementModule { }
