import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ContactLaboratory } from '../../models/ConatctLaboratory.model';
import {Laboratoire} from '../../models/laboratoire.model';
import {Adress} from '../../models/adress.model';
import {ContactLaboratoryDTO} from '../../models/ContactLaboratoryDTO.model';

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

  // Fetch contacts with null laboratories
  getLaboratoriesNotAssigned(): Observable<Laboratoire[]> {
    const url = `${this.BASE_URL}/laboratoriesListNotAssigned`;
    return this.http.get<Laboratoire[]>(url).pipe(
      catchError((error) => {
        console.error('Error retrieving Laboratories Not Assigned:', error);
        return throwError(() => new Error('Error retrieving Laboratories Not Assigned'));
      })
    );
  }

  getAdressesNotAssigned(): Observable<Adress[]> {
    const url = `${this.BASE_URL}/addressesListNotAssigned`;
    return this.http.get<Adress[]>(url).pipe(
      catchError((error) => {
        console.error('Error retrieving Laboratories Not Assigned:', error);
        return throwError(() => new Error('Error retrieving Laboratories Not Assigned'));
      })
    );
  }


  // Method to update a contact's fkIdLaboratory
  updateContactLaboratory(id: number, contact: ContactLaboratoryDTO): Observable<ContactLaboratoryDTO> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.put<ContactLaboratoryDTO>(url, contact).pipe(
      catchError((error) => {
        console.error('Error updating contact laboratory:', error);
        return throwError(() => new Error('Failed to update contact laboratory'));
      })
    );
  }

  addContact(contact: ContactLaboratoryDTO): Observable<ContactLaboratoryDTO> {
    const url = `${this.BASE_URL}/create`;
    return this.http.post<ContactLaboratoryDTO>(url, contact).pipe(
      catchError((error) => {
        console.error('Error adding new contact:', error);
        return throwError(() => new Error('Failed to add new contact'));
      })
    );
  }

  listAllContacts(): Observable<ContactLaboratory[]> {
    const url = `${this.BASE_URL}/listAllContactLaboratories`;
    return this.http.get<ContactLaboratory[]>(url).pipe(
      catchError((error) => {
        console.error('could not retrieve the Data, error');
        return throwError(() => new Error('could not retrieve the Data'));
      })
    );
  }
  getContactLaboratoryById(id: number): Observable<ContactLaboratory> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<ContactLaboratory>(url).pipe(
      catchError((error) => {
        console.error('Error fetching contact laboratory by ID:', error);
        return throwError(() => new Error('Failed to fetch contact laboratory by ID'));
      })
    );
  }
  deleteContact(contactId: number): Observable<void> {
    const url = `${this.BASE_URL}/${contactId}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error('Error deleting contact:', error);
        return throwError(() => new Error('Failed to delete contact'));
      })
    );
  }



}
