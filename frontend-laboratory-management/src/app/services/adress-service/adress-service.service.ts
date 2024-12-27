import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adress } from '../../models/adress.model';

@Injectable({
  providedIn: 'root',
})
export class AdressService {
  private adressApiUrl = 'http://localhost:8003/addresses'; // URL de l'API des adresses

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les adresses
  getAddresses(): Observable<Adress[]> {
    return this.http.get<Adress[]>(this.adressApiUrl);
  }

  // Méthode pour récupérer une adresse par ID
  getAdressById(id: number): Observable<Adress> {
    return this.http.get<Adress>(`${this.adressApiUrl}/${id}`);
  }

  // Méthode pour créer une nouvelle adresse
  createAdress(adress: { nomVoie: string; ville: string; numVoie: number; commune: string; codePostal: number }): Observable<Adress> {
    return this.http.post<Adress>(this.adressApiUrl, adress);
  }

  // Méthode pour mettre à jour une adresse
  updateAdress(id: number, adress: Adress): Observable<Adress> {
    return this.http.put<Adress>(`${this.adressApiUrl}/${id}`, adress);
  }

  // Méthode pour supprimer une adresse
  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adressApiUrl}/${id}`);
  }
}
