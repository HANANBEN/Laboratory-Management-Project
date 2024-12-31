import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user-service.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur.model';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  standalone:false,
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  nomComplet: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Charger les informations du profil depuis le localStorage ou une autre source
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.nomComplet = user.nomComplet || '';
    this.email = user.email || '';
    this.password = ''; // Mot de passe non récupéré pour des raisons de sécurité
    this.phoneNumber = user.phoneNumber || '';  // S'il existe
  }

  onSubmit(): void {
    const updatedUser: Utilisateur = {
      nomComplet: this.nomComplet,
      email: this.email,
      password: this.password,
      numTel: this.phoneNumber // Correction ici
    };

    // Mettre à jour l'utilisateur via le service
    this.userService.updateUtilisateur(updatedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        localStorage.setItem('user', JSON.stringify(response)); // Mettre à jour avec la réponse pour être sûr
        this.router.navigate(['/home/patient/dashboard']); // Redirection après mise à jour
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }

}
