import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Dossier } from '../../models/Dossier.model';
import { Patient } from '../../models/Patient.model';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private readonly BASE_URL = 'http://localhost:8084/api/dossiers'; // Corrected BASE_URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch dossiers by specific patient ID
   * @param idPatient The ID of the patient
   * @returns Observable of Dossier array
   */
  listDossiersByPatientId(idPatient: number): Observable<Dossier[]> {
    const url = `${this.BASE_URL}/byPatientId/${idPatient}`;
    return this.http.get<Dossier[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching dossiers by patient ID:', error);
        return throwError(() => new Error('Failed to fetch dossiers by patient ID'));
      })
    );
  }

  /**
   * Fetch dossiers by patient ID, including null values
   * @param idPatient The ID of the patient
   * @returns Observable of Dossier array
   */
  listDossiersByPatientIdIncludingNull(idPatient: number): Observable<Dossier[]> {
    const url = `${this.BASE_URL}/byPatientIdIncludingNull/${idPatient}`;
    return this.http.get<Dossier[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching dossiers by patient ID including null:', error);
        return throwError(() => new Error('Failed to fetch dossiers by patient ID including null'));
      })
    );
  }

  /**
   * Fetch dossiers with null patients
   * @returns Observable of Dossier array
   */
  getDossiersWithNullPatients(): Observable<Dossier[]> {
    const url = `${this.BASE_URL}/null-patients`;
    return this.http.get<Dossier[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching dossiers with null patients:', error);
        return throwError(() => new Error('Failed to fetch dossiers with null patients'));
      })
    );
  }

  /**
   * Fetch patients not assigned to dossiers
   * @returns Observable of Patient array
   */
  getPatientsNotAssigned(): Observable<Patient[]> {
    const url = `${this.BASE_URL}/patientsNotAssigned`;
    return this.http.get<Patient[]>(url).pipe(
      catchError((error) => {
        console.error('Error retrieving patients not assigned:', error);
        return throwError(() => new Error('Failed to retrieve patients not assigned'));
      })
    );
  }

  /**
   * Update a dossier's details
   * @param id The ID of the dossier
   * @param dossier The dossier object with updated details
   * @returns Observable of updated Dossier
   */
  updateDossier(id: number, dossier: Dossier): Observable<Dossier> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.put<Dossier>(url, dossier).pipe(
      catchError((error) => {
        console.error('Error updating dossier:', error);
        return throwError(() => new Error('Failed to update dossier'));
      })
    );
  }

  /**
   * Create a new dossier
   * @param dossier The new dossier object
   * @returns Observable of created Dossier
   */
  addDossier(dossier: { date: string; numDossier: number; patientId: number; patient: undefined; name: string; fkEmailUtilisateur: number; id: number }): Observable<Dossier> {
    const url = `${this.BASE_URL}/create`;
    return this.http.post<Dossier>(url, dossier).pipe(
      catchError((error) => {
        console.error('Error adding new dossier:', error);
        return throwError(() => new Error('Failed to add new dossier'));
      })
    );
  }

  /**
   * Fetch all dossiers
   * @returns Observable of Dossier array
   */
  listAllDossiers(): Observable<Dossier[]> {
    const url = `${this.BASE_URL}/listAllDossiers`;
    return this.http.get<Dossier[]>(url).pipe(
      catchError((error) => {
        console.error('Error retrieving all dossiers:', error);
        return throwError(() => new Error('Failed to retrieve all dossiers'));
      })
    );
  }

  /**
   * Fetch a dossier by its ID
   * @param id The ID of the dossier
   * @returns Observable of Dossier
   */
  getDossierById(id: number): Observable<Dossier> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Dossier>(url).pipe(
      catchError((error) => {
        console.error('Error fetching dossier by ID:', error);
        return throwError(() => new Error('Failed to fetch dossier by ID'));
      })
    );
  }

  /**
   * Delete a dossier by its ID
   * @param id The ID of the dossier to delete
   * @returns Observable of void
   */
  deleteDossier(id: number): Observable<void> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error('Error deleting dossier:', error);
        return throwError(() => new Error('Failed to delete dossier'));
      })
    );
  }
}
