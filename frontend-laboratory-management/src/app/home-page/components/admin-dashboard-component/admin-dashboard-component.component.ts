import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin-service.service'; // Mettre à jour avec le service AdminService
import { Router } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur.model';
import {UserService} from '../../../services/user-service/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard-component.component.html',
  styleUrls: ['./admin-dashboard-component.component.css']
})
export class AdminDashboardComponent implements OnInit {
  nomComplet: string = '';
  email: string = '';
  role: string = '';
  phoneNumber: string = '';
  utilisateurs: Utilisateur[] = [];  // Liste des utilisateurs à afficher (exemple)

  constructor(private userService: UserService, private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    // Récupérer les données du localStorage
    this.nomComplet = localStorage.getItem('nomComplet') || '';
    this.email = localStorage.getItem('email') || '';
    this.role = localStorage.getItem('role') || '';
    this.phoneNumber = localStorage.getItem('phoneNumber') || '';

    // Charger les utilisateurs pour l'affichage (exemple)
    this.adminService.getUsers().subscribe((data: Utilisateur[]) => {
      this.utilisateurs = data;
    });
  }

  // Fonction pour afficher les détails d'un utilisateur
  showUserDetails(userId: number): void {
    this.router.navigate([`/admin/user-details/${userId}`]); // Exemple de navigation vers la page de détails
  }
}
