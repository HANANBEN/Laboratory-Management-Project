import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { Utilisateur } from '../../models/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8082/api/users/login'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response)); // Stocke l'utilisateur dans le localStorage
      })
    );
  }

  // Exemple d'une méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;  // Si un token est présent dans le localStorage, on considère que l'utilisateur est authentifié
  }

  // Exemple d'une méthode pour obtenir le rôle de l'utilisateur
  getRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || '';  // Récupérer le rôle de l'utilisateur stocké dans le localStorage
  }

  getUserRole(): string {
    const user = localStorage.getItem('user'); // Supposons que vous stockez les informations de l'utilisateur dans le localStorage
    return user ? JSON.parse(user).role : ''; // Retourne le rôle ou une chaîne vide
  }

}

