import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Analysis } from '../../models/Analysis.model';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private readonly BASE_URL = 'http://localhost:5678'; // Base URL for API

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
      .set('projection', 'fullAnalysis'); // Adjust projection as needed

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
}
