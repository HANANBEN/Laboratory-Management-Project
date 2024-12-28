import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiUrl = 'http://localhost:8082/users?projection=fullUser';
  private currentUserSpace: string = ''; // Définir une propriété pour stocker l'espace utilisateur.

  constructor(private http: HttpClient) { }

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

  // Mettre à jour un utilisateur
  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.userApiUrl}/${id}`, utilisateur);
  }

  // Supprimer un utilisateur
  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userApiUrl}/${id}`);
  }
}
