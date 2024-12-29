import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboManagementRoutingModule } from './labo-management-routing.module';
import { LaboListComponent } from './components/labo-list/labo-list.component';
import { LaboCreateComponent } from './components/labo-create/labo-create.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LaboEditComponent} from './components/labo-edit/labo-edit.component';


@NgModule({
  declarations: [

  ],
  imports: [

    CommonModule,
    LaboManagementRoutingModule,
    FormsModule,
    HttpClientModule,
    LaboListComponent,
    LaboCreateComponent,
    MatSnackBarModule,
    LaboEditComponent,

  ]
})
export class LaboManagementModule {}
