import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratoire } from '../../models/laboratoire.model';

@Injectable({
  providedIn: 'root',
})
export class LaboratoireService {
  private labApiUrl = 'http://localhost:8989/laboratories';

  constructor(private http: HttpClient) {}

  getLaboratoires(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(`${this.labApiUrl}?projection=fullLaboratory`);
  }

  getLaboratoireById(id: number): Observable<Laboratoire> {
    // Fixing the URL structure for fetching a laboratory by ID with projection
    return this.http.get<Laboratoire>(`${this.labApiUrl}/${id}?projection=fullLaboratory`);
  }

  createLaboratoire(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(`${this.labApiUrl}?projection=fullLaboratory`, laboratoire);
  }

  updateLaboratoire(id: number, laboratoire: Laboratoire): Observable<Laboratoire> {
    // Fixing the URL structure for updating a laboratory
    return this.http.put<Laboratoire>(`${this.labApiUrl}/${id}`, laboratoire);
  }

  deleteLaboratoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.labApiUrl}/${id}`);
  }
}
