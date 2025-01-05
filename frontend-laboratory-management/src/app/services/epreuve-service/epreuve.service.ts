import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Epreuve } from '../../models/Epreuve.model';

@Injectable({
  providedIn: 'root',
})
export class EpreuveService {
  private readonly BASE_URL = 'http://localhost:1234/api/epreuves'; // URL de base pour l'API Epreuve

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste de toutes les épreuves.
   * @returns Un Observable contenant un tableau d'objets Epreuve.
   */
  getAllEpreuves(): Observable<Epreuve[]> {
    return this.http.get<Epreuve[]>(this.BASE_URL).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des épreuves :', error);
        return throwError(() => new Error('Impossible de récupérer la liste des épreuves.'));
      })
    );
  }

  /**
   * Récupère les détails d'une épreuve par son ID.
   * @param id ID unique de l'épreuve.
   * @returns Un Observable contenant les détails de l'épreuve.
   */
  getEpreuveById(id: number): Observable<Epreuve> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Epreuve>(url).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la récupération de l'épreuve avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de récupérer les détails de l\'épreuve.'));
      })
    );
  }

  /**
   * Crée une nouvelle épreuve.
   * @param epreuve Les données de l'épreuve à créer.
   * @returns Un Observable contenant les données de l'épreuve créée.
   */
  createEpreuve(epreuve: Epreuve): Observable<Epreuve> {
    return this.http.post<Epreuve>(this.BASE_URL, epreuve).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de l\'épreuve :', error);
        return throwError(() => new Error('Impossible de créer une nouvelle épreuve.'));
      })
    );
  }

  /**
   * Met à jour les données d'une épreuve existante.
   * @param id ID unique de l'épreuve.
   * @param epreuve Les nouvelles données de l'épreuve.
   * @returns Un Observable contenant les données de l'épreuve mises à jour.
   */
  updateEpreuve(id: number, epreuve: Epreuve): Observable<Epreuve> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.put<Epreuve>(url, epreuve).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la mise à jour de l'épreuve avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de mettre à jour les données de l\'épreuve.'));
      })
    );
  }

  /**
   * Supprime une épreuve par son ID.
   * @param id ID unique de l'épreuve à supprimer.
   * @returns Un Observable indiquant la réussite ou l'échec de l'opération.
   */
  deleteEpreuve(id: number): Observable<void> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error(`Erreur lors de la suppression de l'épreuve avec l'ID ${id} :`, error);
        return throwError(() => new Error('Impossible de supprimer l\'épreuve.'));
      })
    );
  }
}
