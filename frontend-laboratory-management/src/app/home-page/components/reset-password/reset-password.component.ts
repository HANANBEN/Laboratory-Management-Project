import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone:false,
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  email: string = ''; // L'email de l'utilisateur
  resetCode: string = ''; // Code de réinitialisation
  newPassword: string = ''; // Nouveau mot de passe
  retypeNewPassword: string = ''; // Confirmation du mot de passe
  errorMessage: string | null = null;
  passwordMismatch: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    // Vérification des champs obligatoires
    if (!this.email || !this.resetCode || !this.newPassword || !this.retypeNewPassword) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return;
    }

    // Vérification des mots de passe
    if (this.newPassword !== this.retypeNewPassword) {
      this.passwordMismatch = true;
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.passwordMismatch = false;

    // Appel du service pour réinitialiser le mot de passe
    this.userService.resetPassword(this.email, this.resetCode, this.newPassword).subscribe({
      next: () => {
        alert('Mot de passe réinitialisé avec succès !');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de la réinitialisation :', err);
        this.errorMessage = 'Code de réinitialisation invalide ou une erreur est survenue.';
      },
    });
  }
}
