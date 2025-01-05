import { Injectable } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Utilisateur[] = [
    {
      id: 1,
      email: 'patient1@example.com',
      nomComplet: 'Patient One',
      role: 'Patient',
      numTel: '1234567890',
      laboratoireId: 101,
    },
    {
      id: 2,
      email: 'patient2@example.com',
      nomComplet: 'Patient Two',
      role: 'Patient',
      numTel: '0987654321',
      laboratoireId: 101,
    },
  ];

  getPatients(): Utilisateur[] {
    return this.patients;
  }

  addPatient(patient: Utilisateur): void {
    patient.id = this.patients.length + 1; // Génère un ID unique
    this.patients.push(patient);
  }

  updatePatient(id: number, updatedPatient: Utilisateur): void {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.patients[index] = { ...this.patients[index], ...updatedPatient };
    }
  }

  deletePatient(id: number): void {
    this.patients = this.patients.filter((p) => p.id !== id);
  }
}
