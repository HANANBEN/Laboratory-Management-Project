import {Component, OnInit} from '@angular/core';
import { UserService } from '../../../services/user-service/user-service.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur.model';

@Component({
  selector: 'app-patient-dashboard-component',
  standalone: false,
  templateUrl: './patient-dashboard-component.component.html',
  styleUrl: './patient-dashboard-component.component.css'
})
export class PatientDashboardComponentComponent implements OnInit {
  nomComplet: string = '';
  email: string = '';
  role: string = '';
  phoneNumber: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les données du localStorage
    this.nomComplet = localStorage.getItem('nomComplet') || '';
    this.email = localStorage.getItem('email') || '';
    this.role = localStorage.getItem('role') || '';
  }
}
