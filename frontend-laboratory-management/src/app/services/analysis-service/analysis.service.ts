import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Analysis } from '../../models/Analysis.model';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private readonly BASE_URL = 'http://localhost:5678/analyses'; // Base URL for API

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of analyses by the associated laboratory ID.
   * @param idLaboratory The ID of the laboratory
   * @returns An Observable of an array of Analysis objects
   */
  listAnalysesByLaboratoryId(idLaboratory: number): Observable<Analysis[]> {
    const url = `${this.BASE_URL}/analyses/search/byLaboratoryId`;
    const params = new HttpParams()
      .set('laboratoryId', idLaboratory.toString())
      .set('projection', 'extendedAnalysis'); // Adjust projection as needed

    return this.http.get<any>(url, { params }).pipe(
      map((response) => response._embedded?.analyses || []), // Extract data from _embedded field
      catchError((error) => {
        console.error('Error fetching analyses:', error);
        return throwError(() => new Error('Failed to fetch analyses'));
      })
    );
  }

  /**
   * Fetches details of a specific analysis by its ID.
   * @param idAnalysis The ID of the analysis
   * @returns An Observable of an Analysis object
   */
  getAnalysisById(idAnalysis: number): Observable<Analysis> {
    const url = `${this.BASE_URL}/analyses/${idAnalysis}`;
    return this.http.get<Analysis>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching analysis with ID ${idAnalysis}:`, error);
        return throwError(() => new Error('Failed to fetch analysis details'));
      })
    );
  }

  /**
   * Creates a new analysis.
   * @param analysis The Analysis object to be created
   * @returns An Observable of the created Analysis object
   */
  createAnalysis(analysis: Analysis): Observable<Analysis> {
    const url = `${this.BASE_URL}/analyses`;
    return this.http.post<Analysis>(url, analysis).pipe(
      catchError((error) => {
        console.error('Error creating analysis:', error);
        return throwError(() => new Error('Failed to create analysis'));
      })
    );
  }
  deleteAnalysis(id: number) {
    return this.http.delete(`${this.BASE_URL}/analyses/${id}`);
  }
  /**
   * Updates an existing analysis by its ID.
   * @param idAnalysis The ID of the analysis to be updated
   * @param analysis The updated Analysis object
   * @returns An Observable of the updated Analysis object
   */
  updateAnalysis(idAnalysis: number, analysis: Analysis): Observable<Analysis> {
    const url = `${this.BASE_URL}/analyses/${idAnalysis}`;
    return this.http.put<Analysis>(url, analysis).pipe(
      catchError((error) => {
        console.error(`Error updating analysis with ID ${idAnalysis}:`, error);
        return throwError(() => new Error('Failed to update analysis'));
      })
    );
  }

}