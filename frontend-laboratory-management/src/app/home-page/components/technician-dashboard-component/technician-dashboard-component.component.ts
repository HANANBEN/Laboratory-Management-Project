import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin-service.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Utilisateur } from '../../../models/utilisateur.model';

@Component({
  selector: 'app-technician-dashboard',
  standalone: false,
  templateUrl: './technician-dashboard-component.component.html',
  styleUrls: ['./technician-dashboard-component.component.css']
})
export class TechnicianDashboardComponent {
  nomComplet: string = '';
  role: string = '';
  dossiersParDate: { date: string; count: number }[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    // Charger les informations d'administration
    this.nomComplet = localStorage.getItem('nomComplet') || 'Technicien';
    this.role = localStorage.getItem('role') || 'Technicien';

    // Charger les données statiques des dossiers médicaux
    this.loadDossiers();

    // Initialiser le graphique
    this.initChart();
  }

  loadDossiers(): void {
    // Exemple de données statiques
    this.dossiersParDate = [
      { date: '2025-01-01', count: 5 },
      { date: '2025-01-02', count: 8 },
      { date: '2025-01-03', count: 4 },
      { date: '2025-01-04', count: 10 },
      { date: '2025-01-05', count: 6 }
    ];
  }

  initChart(): void {
    const ctx = (document.getElementById('adminChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      const dates = this.dossiersParDate.map(d => d.date);
      const counts = this.dossiersParDate.map(d => d.count);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Dossiers Médicaux Créés',
            data: counts,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderWidth: 2,
            tension: 0.4 // Ajout d'une courbe lisse
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              enabled: true
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Dates'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Nombre de Dossiers'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  navigateToAnalysis() {
    this.router.navigate(['/Analysis/list']);
  }
}
