import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin-service.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard-component.component.html',
  standalone:false,
  styleUrls: ['./admin-dashboard-component.component.css']
})
export class AdminDashboardComponent implements OnInit {
  nomComplet: string = '';
  role: string = '';
  utilisateurs: Utilisateur[] = []; // Liste d'utilisateurs pour le tableau

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    // Charger les informations d'administration
    this.nomComplet = localStorage.getItem('nomComplet') || 'Admin';
    this.role = localStorage.getItem('role') || 'Administrator';

    // Charger les données utilisateurs
    this.loadUsers();

    // Initialiser le graphique
    this.initChart();
  }

  loadUsers(): void {
    // Exemple de données statiques
    this.utilisateurs = [
      { email: 'user1@example.com', nomComplet: 'User One', profession: 'Technician' },
      { email: 'user2@example.com', nomComplet: 'User Two', profession: 'Admin' }
    ];
  }

  initChart(): void {
    const ctx = (document.getElementById('adminChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
            label: 'User Registrations',
            data: [10, 15, 8, 20, 12],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              enabled: true
            }
          }
        }
      });
    }
  }
}
