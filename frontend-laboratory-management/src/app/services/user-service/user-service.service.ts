import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = 'http://localhost:8082/api/users';
  private currentUserSpace: string = ''; // Définir une propriété pour stocker l'espace utilisateur.

  constructor(private http: HttpClient) {}

  // Getter pour obtenir l'espace actuel
  getUserSpace(): string {
    return this.currentUserSpace;
  }

  // Setter pour définir l'espace sélectionné
  setUserSpace(space: string): void {
    this.currentUserSpace = space;
  }

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.userApiUrl);
  }

  // Récupérer un utilisateur par son ID
  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.userApiUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.userApiUrl, utilisateur);
  }

  // Supprimer un utilisateur
  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userApiUrl}/${id}`);
  }

  // Récupérer un utilisateur par son email
  getUtilisateurByEmail(email: string): Observable<Utilisateur> {
    // L'URL est mise à jour pour inclure la recherche par email
    return this.http.get<Utilisateur>(`http://localhost:8082/users/search/findByEmail?email=${email}`);
  }

  // Mettre à jour un utilisateur
  updateUtilisateur(user: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`http://localhost:8082/api/users/update`, user);
  }
  validateOldPassword(email: string, oldPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`http://localhost:8082/api/users/validate-password`, { email, oldPassword });
  }
  sendPasswordRecoveryEmail(email: string): Observable<void> {
    return this.http.post<void>(`http://localhost:8082/api/users/recover-password`, { email });
  }
}
