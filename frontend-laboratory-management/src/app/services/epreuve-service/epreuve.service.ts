import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Epreuve } from '../../models/Epreuve.model';

@Injectable({
  providedIn: 'root',
})
export class EpreuveService {
  private apiUrl = 'http://localhost:1234/api/epreuves';

  constructor(private http: HttpClient) {}

  // Create a new Epreuve
  createEpreuve(epreuve): Observable<Epreuve> {
    return this.http.post<Epreuve>(`${this.apiUrl}/create`, epreuve);
  }

  // Get all Epreuves
  getAllEpreuves(): Observable<Epreuve[]> {
    return this.http.get<Epreuve[]>(`${this.apiUrl}/listAll`);
  }

  // Get Epreuves by Analysis ID
  getEpreuvesByAnalysis(analysisId: number): Observable<Epreuve[]> {
    return this.http.get<Epreuve[]>(`${this.apiUrl}/byAnalysis/${analysisId}`);
  }

  // Get a single Epreuve by ID
  getEpreuveById(id: number): Observable<Epreuve> {
    return this.http.get<Epreuve>(`${this.apiUrl}/${id}`);
  }

  // Update an Epreuve
  updateEpreuve(id: number, epreuve: Epreuve): Observable<Epreuve> {
    return this.http.put<Epreuve>(`${this.apiUrl}/${id}`, epreuve);
  }

  // Delete an Epreuve
  deleteEpreuve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
