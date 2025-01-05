import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEpreuveComponent } from './components/edit-epreuve/edit-epreuve.component';
import { ListAllEpreuveComponent } from './components/list-all-epreuve/list-all-epreuve.component';
import {EpreuveCreateComponent} from './components/epreuve-create/epreuve-create.component';
import {EpreuveManagementRoutingModule} from './epreuve-management-routing.module';



@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    EpreuveCreateComponent,
EpreuveManagementRoutingModule,
    ListAllEpreuveComponent,
    EditEpreuveComponent,

  ]
})
export class EpreuveManagementModule { }
