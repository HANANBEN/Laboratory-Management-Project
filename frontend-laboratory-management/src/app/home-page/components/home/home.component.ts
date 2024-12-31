import { Component } from '@angular/core';
import {LaboratoireService} from '../../../services/labo-service/laboratoire.service';
import {UserService} from '../../../services/user-service/user-service.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private UserService: UserService) {}

}
