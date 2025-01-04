import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Patient } from '../../models/Patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly BASE_URL = 'http://localhost:8084/api/patients'; // URL de base pour l'API Patient

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste de tous les patients.
   * @returns Un Observable contenant un tableau d'objets Patient.
   */
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.BASE_URL).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des patients :', error);
        return throwError(() => new Error('Impossible de récupérer la liste des patients.'));
      })
    );
  }

  /**
   * Récupère les détails d'un patient par son ID.
   * @param id ID unique du patient.
   * @returns Un Observable contenant les détails du patient.
   */
  getPatientById(id: number): Observable<Patient> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Patient>(url).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la récupération du patient avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de récupérer les détails du patient.'));
      })
    );
  }

  /**
   * Crée un nouveau patient.
   * @param patient Les données du patient à créer.
   * @returns Un Observable contenant les données du patient créé.
   */
  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.BASE_URL, patient).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création du patient :', error);
        return throwError(() => new Error('Impossible de créer un nouveau patient.'));
      })
    );
  }

  /**
   * Met à jour les données d'un patient existant.
   * @param id ID unique du patient.
   * @param patient Les nouvelles données du patient.
   * @returns Un Observable contenant les données du patient mises à jour.
   */
  updatePatient(id: number, patient: Patient): Observable<Patient> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.put<Patient>(url, patient).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la mise à jour du patient avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de mettre à jour les données du patient.'));
      })
    );
  }

  /**
   * Supprime un patient par son ID.
   * @param id ID unique du patient à supprimer.
   * @returns Un Observable indiquant la réussite ou l'échec de l'opération.
   */
  deletePatient(id: number): Observable<void> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la suppression du patient avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de supprimer le patient.'));
      })
    );
  }

  /**
   * Recherche des patients par des critères spécifiques.
   * @param searchParams Paramètres de recherche sous forme d'objet clé-valeur.
   * @returns Un Observable contenant un tableau de patients correspondant aux critères.
   */
  searchPatients(searchParams: { [key: string]: string }): Observable<Patient[]> {
    const params = new HttpParams({ fromObject: searchParams });
    const url = `${this.BASE_URL}/search`;
    return this.http.get<Patient[]>(url, { params }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la recherche de patients :', error);
        return throwError(() => new Error('Impossible de rechercher les patients.'));
      })
    );
  }
}
