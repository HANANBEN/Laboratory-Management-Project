import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Analysis } from '../../../models/Analysis.model';
import { TestAnalysis } from '../../../models/TestAnalysis.model';
import { AnalysisService } from '../../../services/analysis-service/analysis.service'; // Service pour gérer les requêtes liées aux analyses
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service'; // Service pour récupérer les laboratoires
import { TestAnalysisService } from '../../../services/testAnalysis-service/testAnalysis.service'; // Service pour récupérer les tests

@Component({
  selector: 'app-create-analysis',
  standalone: true,
  templateUrl: './create-analysis.component.html',
  styleUrls: ['./create-analysis.component.css'],
})
export class CreateAnalysisComponent implements OnInit {
  analysis: Analysis = {
    id: 0,
    fkLaboratoireId: 0,
    nom: '',
    description: '',
    testAnalysis: [],
  };
  laboratories: any[] = []; // Liste des laboratoires disponibles
  availableTests: any[] = []; // Liste des tests disponibles
  selectedTest: any = null; // Test sélectionné pour être ajouté

  constructor(
    private analysisService: AnalysisService,
    private laboratoireService: LaboratoireService,
    private testAnalysisService: TestAnalysisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger la liste des laboratoires
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data) => {
        this.laboratories = data;
        console.log('Laboratories loaded:', this.laboratories);
      },
      error: (err) => console.error('Error loading laboratories:', err),
    });

    // Charger la liste des tests disponibles
    this.testAnalysisService.listTestAnalysisByAnalysisId(0).subscribe({
      next: (data) => {
        this.availableTests = data;
        console.log('Available tests loaded:', this.availableTests);
      },
      error: (err) => console.error('Error loading tests:', err),
    });
  }

  // Ajouter un test à la liste des tests associés
  addTest(): void {
    if (this.selectedTest) {
      const testToAdd = this.availableTests.find(
        (test) => test.id === this.selectedTest
      );
      if (testToAdd && !this.analysis.testAnalysis.some((test) => test.id === testToAdd.id)) {
        this.analysis.testAnalysis.push(testToAdd);
      }
      this.selectedTest = null; // Réinitialiser la sélection
    }
  }

  // Supprimer un test de la liste des tests associés
  removeTest(index: number): void {
    this.analysis.testAnalysis.splice(index, 1);
  }

  // Sauvegarder l'analyse
  saveAnalysis(): void {
    this.analysisService.createAnalysis(this.analysis).subscribe({
      next: () => {
        console.log('Analysis created successfully');
        this.router.navigate(['/analyses']); // Redirection après la création
      },
      error: (err) => console.error('Error creating analysis:', err),
    });
  }

  // Annuler et revenir à la liste
  cancel(): void {
    this.router.navigate(['/analyses']);
  }
}
