import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboManagementRoutingModule } from './labo-management-routing.module';
import { LaboListComponent } from './components/labo-list/labo-list.component';
import { LaboCreateComponent } from './components/labo-create/labo-create.component';
import { LaboEditComponent } from './components/labo-edit/labo-edit.component';
import { LaboViewComponent } from './components/labo-view/labo-view.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    LaboCreateComponent,
    LaboEditComponent,
    LaboViewComponent,

  ],
  imports: [

    CommonModule,
    LaboManagementRoutingModule,
    FormsModule,
    HttpClientModule,
    LaboListComponent

  ]
})
export class LaboManagementModule { }
