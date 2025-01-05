import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../../../services/examen-service/examen.service';
import { Examen } from '../../../models/Examen.model';
import { Dossier } from '../../../models/Dossier.model';
import { Epreuve } from '../../../models/Epreuve.model';
import { Analysis } from '../../../models/Analysis.model';
import {Patient} from '../../../models/Patient.model';
import {DossierService} from '../../../services/dossier-service/dossier.service';
import {EpreuveService} from '../../../services/epreuve-service/epreuve.service';
import {AnalysisService} from '../../../services/analysis-service/analysis.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-examen',
  standalone : true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-examen.component.html',
})
export class EditExamenComponent implements OnInit {
  examen: Examen = {
    id: 0,
    fkNumDossier: 0,
    dossier: {} as Dossier,
    fkIdEpeuve: 0,
    epreuve: {} as Epreuve,
    fkIdTestAnalysis: 0,
    testAnalysis: {} as Analysis,
    fkPatientId: 0,
    patient: {} as Patient,
  };
  dossiers: Dossier[] = [];
  epreuves: Epreuve[] = [];
  analyses: Analysis[] = [];

  constructor(
    private examenService: ExamenService,
    private dossierService: DossierService,  // Inject DossierService
    private epreuveService: EpreuveService,  // Inject EpreuveService
    private analysisService: AnalysisService,  // Inject AnalysisService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const examenId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadExamen(examenId);
    this.loadDossiers();
    this.loadEpreuves();
    this.loadAnalyses();
  }

  // Load examen by ID
  loadExamen(id: number): void {
    this.examenService.getExamenById(id).subscribe((data) => {
      this.examen = data;
    });
  }

  // Load dossiers from DossierService
  loadDossiers(): void {
    this.dossierService.getAllDossiers().subscribe((data) => {
      this.dossiers = data;
    });
  }

  // Load epreuves from EpreuveService
  loadEpreuves(): void {
    this.epreuveService.getAllEpreuves().subscribe((data) => {
      this.epreuves = data;
    });
  }

  // Load analyses from AnalysisService
  loadAnalyses(): void {
    this.analysisService.getAllAnalyses().subscribe((data) => {
      this.analyses = data;
    });
  }

  // Update examen
  updateExamen(): void {
    const examenId = this.examen.id; // On récupère l'ID de l'examen
    this.examenService.updateExamen(examenId, this.examen).subscribe(
      () => {
        this.router.navigate(['/examens']); // Redirection après la mise à jour
      },
      (error) => {
        console.error('Error updating examen:', error); // Affichage de l'erreur si la mise à jour échoue
      }
    );
  }


  // Cancel edit and go back
  cancelEdit(): void {
    this.router.navigate(['/examens']);
  }
}
