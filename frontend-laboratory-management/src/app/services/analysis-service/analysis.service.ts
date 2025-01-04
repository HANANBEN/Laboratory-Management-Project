import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Analysis } from '../../models/Analysis.model';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private apiUrl = 'http://localhost:5678/api/analyses';

  constructor(private http: HttpClient) {}

  // Fetch analyses by laboratory ID
  getAnalysesByLaboratoryId(laboratoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byLaboratoryId/${laboratoryId}`);
  }

  // Fetch all analyses
  getAllAnalyses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listAll`);
  }

  // Fetch analysis by ID
  getAnalysisById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create new analysis
  createAnalysis(analysis: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, analysis);
  }

  // Update existing analysis
  updateAnalysis(id: number, analysis: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, analysis);
  }

  // Delete analysis by ID
  deleteAnalysis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  // Fetch analyses with null laboratories
  getAnalysesWithNullLaboratory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/null-laboratories`);
  }

  // Fetch analyses by name
  getAnalysesByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byName/${name}`);
  }
}
