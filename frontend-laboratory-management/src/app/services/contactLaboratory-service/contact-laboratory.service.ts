import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ContactLaboratory } from '../../models/ConatctLaboratory.model';

@Injectable({
  providedIn: 'root'
})
export class ContactLaboratoryService {

  constructor(private http: HttpClient) {}

  // Updated BASE_URL to include /api
  private readonly BASE_URL = 'http://localhost:6789/api/contact-laboratories'; // Corrected BASE_URL

  // Fetch contact laboratories by specific laboratory ID
  listContactLaboratoryByIdLaboratory(idlab: number): Observable<ContactLaboratory[]> {
    const url = `${this.BASE_URL}/byLaboratoryId/${idlab}`;
    return this.http.get<ContactLaboratory[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching contact laboratories by ID:', error);
        return throwError(() => new Error('Failed to fetch contact laboratories by ID'));
      })
    );
  }

  // Fetch contact laboratories by laboratory ID, including null values
  listContactLaboratoryByIdLaboratoryIncludingNull(idlab: number): Observable<ContactLaboratory[]> {
    const url = `${this.BASE_URL}/byLaboratoryIdIncludingNull/${idlab}`;
    return this.http.get<ContactLaboratory[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching contact laboratories by ID including null values:', error);
        return throwError(() => new Error('Failed to fetch contact laboratories by ID including null values'));
      })
    );
  }

  // Fetch contacts with null laboratories
  getContactsWithNullLaboratory(): Observable<ContactLaboratory[]> {
    const url = `${this.BASE_URL}/null-laboratories`;
    return this.http.get<ContactLaboratory[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching contacts with null laboratory:', error);
        return throwError(() => new Error('Failed to fetch contacts with null laboratory'));
      })
    );
  }


  // Method to update a contact's fkIdLaboratory
  updateContactLaboratory(id: number, contact: ContactLaboratory): Observable<ContactLaboratory> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.put<ContactLaboratory>(url, contact).pipe(
      catchError((error) => {
        console.error('Error updating contact laboratory:', error);
        return throwError(() => new Error('Failed to update contact laboratory'));
      })
    );
  }

  addContact(contact: ContactLaboratory): Observable<ContactLaboratory> {
    const url = `${this.BASE_URL}/create`;
    return this.http.post<ContactLaboratory>(url, contact).pipe(
      catchError((error) => {
        console.error('Error adding new contact:', error);
        return throwError(() => new Error('Failed to add new contact'));
      })
    );
  }

}
