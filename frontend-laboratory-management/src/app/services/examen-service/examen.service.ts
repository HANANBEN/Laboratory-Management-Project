import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Examen } from '../../models/Examen.model';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  private readonly BASE_URL = 'http://localhost:8070/api/examens'; // URL de base pour l'API Examen

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste de tous les examens.
   * @returns Un Observable contenant un tableau d'objets Examen.
   */
  getAllExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.BASE_URL).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des examens :', error);
        return throwError(() => new Error('Impossible de récupérer la liste des examens.'));
      })
    );
  }

  /**
   * Récupère les détails d'un examen par son ID.
   * @param id ID unique de l'examen.
   * @returns Un Observable contenant les détails de l'examen.
   */
  getExamenById(id: number): Observable<Examen> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Examen>(url).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la récupération de l'examen avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de récupérer les détails de l\'examen.'));
      })
    );
  }

  /**
   * Crée un nouveau examen.
   * @param examen Les données de l'examen à créer.
   * @returns Un Observable contenant les données de l'examen créé.
   */
  createExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.BASE_URL, examen).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de l\'examen :', error);
        return throwError(() => new Error('Impossible de créer un nouvel examen.'));
      })
    );
  }

  /**
   * Met à jour les données d'un examen existant.
   * @param id ID unique de l'examen.
   * @param examen Les nouvelles données de l'examen.
   * @returns Un Observable contenant les données de l'examen mises à jour.
   */
  updateExamen(id: number, examen: Examen): Observable<Examen> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.put<Examen>(url, examen).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la mise à jour de l'examen avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de mettre à jour les données de l\'examen.'));
      })
    );
  }

  /**
   * Supprime un examen par son ID.
   * @param id ID unique de l'examen à supprimer.
   * @returns Un Observable indiquant la réussite ou l'échec de l'opération.
   */
  deleteExamen(id: number): Observable<void> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la suppression de l'examen avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de supprimer l\'examen.'));
      })
    );
  }

  /**
   * Recherche des examens par des critères spécifiques.
   * @param searchParams Paramètres de recherche sous forme d'objet clé-valeur.
   * @returns Un Observable contenant un tableau d'examens correspondant aux critères.
   */
  searchExamens(searchParams: { [key: string]: string }): Observable<Examen[]> {
    const params = new HttpParams({ fromObject: searchParams });
    const url = `${this.BASE_URL}/search`;
    return this.http.get<Examen[]>(url, { params }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la recherche des examens :', error);
        return throwError(() => new Error('Impossible de rechercher les examens.'));
      })
    );
  }
}
