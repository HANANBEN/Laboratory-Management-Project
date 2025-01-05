import { Component } from '@angular/core';
import {LaboratoireService} from '../../../services/labo-service/laboratoire.service';
import {UserService} from '../../../services/user-service/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  dropdownOpen = false;

  constructor(private UserService: UserService, private router: Router) {}
  navigateTo(path: string, queryParams: any): void {
    this.router.navigate([path], { queryParams });
  }
  toggleDropdown(state: boolean): void {
    this.dropdownOpen = state;
  }
}
