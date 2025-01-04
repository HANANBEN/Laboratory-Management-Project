import { Component, OnInit } from '@angular/core';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { PatientService } from '../../../services/patient-service/patient.service';
import { Dossier } from '../../../models/Dossier.model';
import { Patient } from '../../../models/Patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-dossier.component.html',
  styleUrls: ['./edit-dossier.component.css']
})
export class EditDossierComponent implements OnInit {
  dossier: Dossier = {
    numDossier: 0,
    patient: {} as Patient,
    fkEmailUtilisateur: 0,
    date: '',
  };
  patients: Patient[] = [];
  dossierId!: number;

  constructor(
    private dossierService: DossierService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dossierId = +this.route.snapshot.paramMap.get('id')!;
    this.loadDossier();
    this.loadPatients();
  }

  // Load the dossier details by its ID
  loadDossier(): void {
    this.dossierService.getDossierById(this.dossierId).subscribe(
      (dossier) => {
        this.dossier = dossier;
      },
      (error) => {
        console.error('Error loading dossier', error);
      }
    );
  }

  // Load the list of patients
  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
      },
      (error) => {
        console.error('Error loading patients', error);
      }
    );
  }

  // Handle form submission to update the dossier
  updateDossier(): void {
    this.dossierService.updateDossier(this.dossierId, this.dossier).subscribe(
      () => {
        this.router.navigate(['/dossiers']);
      },
      (error) => {
        console.error('Error updating dossier', error);
      }
    );
  }

  // Handle cancel action
  cancelEdit(): void {
    this.router.navigate(['/dossiers']);
  }
}
