import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierManagementRoutingModule } from './dossier-management-routing.module';
import { ListDossierComponent } from './components/list-dossier/list-dossier.component';
import { EditDossierComponent } from './components/edit-dossier/edit-dossier.component';
import { CreateDossierComponent } from './components/create-dossier/create-dossier.component';


@NgModule({
  declarations: [


  ],
  imports: [
    ListDossierComponent,
    EditDossierComponent,

    CreateDossierComponent,
    CommonModule,
    DossierManagementRoutingModule
  ]
})
export class DossierManagementModule { }
