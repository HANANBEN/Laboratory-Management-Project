import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient/patient.service';
import {Utilisateur} from '../../../models/utilisateur.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  standalone:false,
  styleUrls: ['./manage-patient.component.css'],
})
export class ManagePatientComponent implements OnInit {
  patients: Utilisateur[] = [];
  newPatient: Utilisateur = {
    email: '',
    nomComplet: '',
    role: 'Patient',
    numTel: '',
  };

  constructor(private patientService: PatientService, private location: Location) {}

  ngOnInit(): void {
    this.patients = this.patientService.getPatients();
  }

  onSubmit(): void {
    this.patientService.addPatient(this.newPatient);
    this.patients = this.patientService.getPatients();
    this.newPatient = { email: '', nomComplet: '', role: 'Patient', numTel: '' };
  }

  editPatient(patient: Utilisateur): void {
    this.newPatient = { ...patient };
  }

  deletePatient(id: number | undefined): void {
    if (id !== undefined) {
      this.patientService.deletePatient(id);
      this.patients = this.patientService.getPatients();
    }
  }
  goBack(): void {
    this.location.back(); // Retourne à la page précédente
  }
}
