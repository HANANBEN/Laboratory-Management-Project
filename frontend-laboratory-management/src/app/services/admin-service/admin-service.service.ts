import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/utilisateur.model'; // Import de l'interface Utilisateur

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8082/api/users'; // URL de l'API backend
  private currentUserSpace: string = ''; // Propriété pour stocker l'espace de l'utilisateur courant

  constructor(private http: HttpClient) {}

  // Getter pour obtenir l'espace utilisateur actuel
  getUserSpace(): string {
    return this.currentUserSpace;
  }

  // Setter pour définir l'espace sélectionné
  setUserSpace(space: string): void {
    this.currentUserSpace = space;
  }

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  // Récupérer un utilisateur par son ID
  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer un utilisateur par son email
  getUserByEmail(email: string): Observable<Utilisateur> {
    // L'URL est mise à jour pour inclure la recherche par email
    return this.http.get<Utilisateur>(`${this.apiUrl}/search/findByEmail?email=${email}`);
  }

  // Mettre à jour un utilisateur
  updateUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/update`, user);
  }

  // Valider l'ancien mot de passe lors de la mise à jour du mot de passe
  validateOldPassword(email: string, oldPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/validate-password`, { email, oldPassword });
  }

  // Envoyer un email de récupération de mot de passe
  sendPasswordRecoveryEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/recover-password`, { email });
  }

  // Valider le code de réinitialisation de mot de passe
  validateResetCode(email: string, resetCode: string): Observable<any> {
    const body = { email, resetCode };
    return this.http.post(`${this.apiUrl}/validate-reset-code`, body);
  }

  // Réinitialiser le mot de passe
  resetPassword(email: string, resetCode: string, newPassword: string): Observable<any> {
    const body = { email, resetCode, newPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }
}
