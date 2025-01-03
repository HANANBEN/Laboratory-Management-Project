import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpreuveCreateComponent } from './epreuve-management/components/epreuve-create/epreuve-create.component';
import { EditEpreuveComponent } from './components/edit-epreuve/edit-epreuve.component';
import { ListAllEpreuveComponent } from './components/list-all-epreuve/list-all-epreuve.component';



@NgModule({
  declarations: [

  
    EditEpreuveComponent,
         ListAllEpreuveComponent
  ],
  imports: [
    CommonModule,
    EpreuveCreateComponent
  ]
})
export class EpreuveManagementModule { }
