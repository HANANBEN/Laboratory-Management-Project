import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratoire } from '../../models/laboratoire.model';

@Injectable({
  providedIn: 'root',
})
export class LaboratoireService {
  private labApiUrl = 'http://localhost:8989/laboratories?projection=fullLaboratory';

  constructor(private http: HttpClient) {}

  getLaboratoires(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(this.labApiUrl);
  }

  getLaboratoireById(id: number): Observable<Laboratoire> {
    return this.http.get<Laboratoire>(`${this.labApiUrl}/${id}`);
  }

  createLaboratoire(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(this.labApiUrl, laboratoire);
  }

  updateLaboratoire(id: number, laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.put<Laboratoire>(`${this.labApiUrl}/${id}`, laboratoire);
  }

  deleteLaboratoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.labApiUrl}/${id}`);
  }
}
