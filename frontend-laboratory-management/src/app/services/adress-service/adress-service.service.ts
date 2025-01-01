import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import { Adress } from '../../models/adress.model';

@Injectable({
  providedIn: 'root',
})
export class AdressService {
  private adressApiUrl = 'http://localhost:8003/adresses'; // Base URL for the address API
  private projectionParam = 'projection=fullAdress'; // Query parameter for projection

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Adress[]> {
    return this.http.get<any>(`${this.adressApiUrl}?${this.projectionParam}`).pipe(
      map((response) => {
        console.log('Mapped API response:', response); // Log full response
        return response._embedded?.adresses || []; // Correct mapping
      }),
      catchError((error) => {
        console.error('Error fetching addresses:', error);
        return throwError(() => new Error('Failed to fetch addresses'));
      })
    );
  }
  // Method to fetch an address by ID
  getAdressById(id: number): Observable<Adress> {
    return this.http.get<Adress>(`${this.adressApiUrl}/${id}?${this.projectionParam}`);
  }

  // Method to create a new address
  createAdress(adress: { nomVoie: string; ville: string; numVoie: number; commune: string; codePostal: number }): Observable<Adress> {
    return this.http.post<Adress>(`${this.adressApiUrl}?${this.projectionParam}`, adress);
  }

  // Method to update an address
  updateAdress(id: number, adress: Adress): Observable<Adress> {
    return this.http.put<Adress>(`${this.adressApiUrl}/${id}?${this.projectionParam}`, adress);
  }

  // Method to delete an address
  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adressApiUrl}/${id}?${this.projectionParam}`);
  }
}
