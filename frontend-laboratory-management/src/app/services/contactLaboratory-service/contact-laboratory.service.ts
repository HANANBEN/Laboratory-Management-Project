import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ContactLaboratory} from '../../models/ConatctLaboratory.model';



@Injectable({
  providedIn: 'root'
})
export class ContactLaboratoryService {

  constructor(private http: HttpClient) {}


  private readonly BASE_URL = 'http://localhost:6789';


  listContactLaboratoryByIdLaboratory(idlab: number): Observable<ContactLaboratory[]> {
    const url = `${this.BASE_URL}/contactLaboratories/search/byLaboratoryId`;
    const params = new HttpParams()
      .set('laboratoryId', idlab.toString())
      .set('projection', 'fullContactLaboratory'); // Use the updated projection

    return this.http.get<any>(url, { params }).pipe(
      map((response) => response._embedded.contactLaboratories || []), // Extract data
      catchError((error) => {
        console.error('Error fetching contact laboratories:', error);
        return throwError(() => new Error('Failed to fetch contact laboratories'));
      })
    );
  }


}
