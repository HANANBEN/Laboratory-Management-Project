import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdressHomeComponent } from './components/adress-home/adress-home.component';
import { AdressListComponent } from './components/adress-list/adress-list.component';
import { AdressCreateComponent } from './components/adress-create/adress-create.component';
import { AdressEditComponent } from './components/adress-edit/adress-edit.component';
import {AdressManagementRoutingModule} from './adress-management-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    AdressHomeComponent,
    AdressListComponent,
    AdressCreateComponent,
    AdressEditComponent,
    CommonModule,
    FormsModule,
    AdressManagementRoutingModule,
    RouterModule
  ],
  exports: [AdressCreateComponent]
})
export class AdressManagementModule {}
