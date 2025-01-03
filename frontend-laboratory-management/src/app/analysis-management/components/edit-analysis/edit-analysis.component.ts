import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from '../../../services/analysis-service';
import { Analysis } from '../../../models/Analysis.model';

@Component({
  selector: 'app-edit-analysis',
  standalone: true,
  templateUrl: './edit-analysis.component.html',
  styleUrls: ['./edit-analysis.component.css'],
})
export class EditAnalysisComponent implements OnInit {
  analysis: Analysis = {
    id: 0,
    fkLaboratoireId: 0,
    nom: '',
    description: '',
    testAnalysis: [],
  };
  laboratories = []; // Liste des laboratoires à charger depuis le service

  constructor(
    private analysisService: AnalysisService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadAnalysis(id);
    }
    this.loadLaboratories();
  }

  loadAnalysis(id: number): void {
    this.analysisService.getAnalysisById(id).subscribe({
      next: (data) => {
        this.analysis = data;
      },
      error: (err) => {
        console.error('Error loading analysis:', err);
      },
    });
  }

  loadLaboratories(): void {
    // Remplacer par l'appel à un service pour charger les laboratoires
    this.laboratories = [
      { id: 1, nom: 'Lab A' },
      { id: 2, nom: 'Lab B' },
    ];
  }

  updateAnalysis(): void {
    this.analysisService.updateAnalysis(this.analysis.id, this.analysis).subscribe({
      next: () => {
        console.log('Analysis updated successfully');
        this.router.navigate(['/analyses']);
      },
      error: (err) => {
        console.error('Error updating analysis:', err);
      },
    });
  }

  addTestAnalysis(): void {
    this.analysis.testAnalysis.push({ id: 0, name: '' }); // Ajouter un test vide
  }

  cancelEdit(): void {
    this.router.navigate(['/analyses']);
  }
}
