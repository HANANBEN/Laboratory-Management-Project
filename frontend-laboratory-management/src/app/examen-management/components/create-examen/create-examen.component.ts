import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../../services/examen-service/examen.service';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { EpreuveService } from '../../../services/epreuve-service/epreuve.service';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { PatientService } from '../../../services/patient-service/patient.service';
import { Examen } from '../../../models/Examen.model';
import { Dossier } from '../../../models/Dossier.model';
import { Epreuve } from '../../../models/Epreuve.model';
import { Analysis } from '../../../models/Analysis.model';
import { Patient } from '../../../models/Patient.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-examen',
  standalone : true,
  templateUrl: './create-examen.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./create-examen.component.css'],
})
export class CreateExamenComponent implements OnInit {
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
    resultat: '',
  };

  dossiers: Dossier[] = [];
  epreuves: Epreuve[] = [];
  analyses: Analysis[] = [];
  patients: Patient[] = [];

  constructor(
    private examenService: ExamenService,
    private dossierService: DossierService,
    private epreuveService: EpreuveService,
    private analysisService: AnalysisService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadDossiers();
    this.loadEpreuves();
    this.loadAnalyses();
    this.loadPatients();
  }

  loadDossiers() {
    this.dossierService.getAllDossiers().subscribe((data) => {
      this.dossiers = data;
    });
  }

  loadEpreuves() {
    this.epreuveService.getAllEpreuves().subscribe((data) => {
      this.epreuves = data;
    });
  }

  loadAnalyses() {
    this.analysisService.getAllAnalyses().subscribe((data) => {
      this.analyses = data;
    });
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  createExamen() {
    this.examenService.createExamen(this.examen).subscribe(
      (response) => {
        alert('Examen created successfully');
        // Optionally, navigate or reset form
      },
      (error) => {
        console.error('Error creating examen:', error);
      }
    );
  }
}
