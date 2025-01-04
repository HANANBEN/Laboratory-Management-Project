import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Analysis } from '../../../models/Analysis.model';
import { Laboratoire } from '../../../models/laboratoire.model'; // Import du modèle Laboratoire
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-analysis.component.html',
  styleUrls: ['./edit-analysis.component.css'],
})
export class EditAnalysisComponent implements OnInit {
  analysis: { fkLaboratoireId: number; description: string; testAnalysis: any[]; id: number; nom: string } = {
    id: 0,
    fkLaboratoireId: 0,
    nom: '',
    description: '',
    testAnalysis: [],
  };

  laboratories: Laboratoire[] = []; // Spécification du type correct

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
      next: (data: Analysis) => {
        this.analysis = data;
      },
      error: (err: any) => {
        console.error('Error loading analysis:', err);
      },
    });
  }

  updateAnalysis(): void {
    if (this.analysis.id) {
      this.analysisService.updateAnalysis(this.analysis.id, this.analysis).subscribe({
        next: (updatedAnalysis) => {
          console.log('Analysis updated successfully:', updatedAnalysis);
          // Redirection après succès
          this.router.navigate(['/analyses/list']);
        },
        error: (error) => {
          console.error('Failed to update analysis:', error.message || error);
          alert('An error occurred while updating the analysis. Please try again.');
        },
      });
    } else {
      console.warn('Analysis ID is missing, cannot update.');
      alert('The analysis cannot be updated because it does not have a valid ID.');
    }
  }

  loadLaboratories(): void {
    // Remplacer par l'appel à un service pour charger les laboratoires
    this.laboratories = [
      { id: 1, nom: 'Lab A', logo: '', nrc: '12345', isActive: true },
      { id: 2, nom: 'Lab B', logo: '', nrc: '67890', isActive: true },
    ];
  }

  cancelEdit(): void {
    this.router.navigate(['/analyses']);
  }
}
