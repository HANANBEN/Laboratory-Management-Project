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
  oldPassword: string = ''; // Nouveau champ
  numTel: string = '';
  errorMessage: string | null = null;
  retypeNewPassword: string='';
  resetCode: string='';
  newPassword: string='';
  retypePassword:String='';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.nomComplet = user.nomComplet || '';
    this.email = user.email || '';
    this.numTel = user.numTel || '';
  }

  onSubmit(): void {
    // Validez l'ancien mot de passe avant d'autoriser les modifications
    this.userService.validateOldPassword(this.email, this.oldPassword).subscribe({
      next: (isValid) => {
        if (isValid) {
          // Si l'ancien mot de passe est valide, mettez à jour l'utilisateur
          const updatedUser: Utilisateur = {
            nomComplet: this.nomComplet,
            email: this.email,
            password: this.password,
            numTel: this.numTel,
          };

          this.userService.updateUtilisateur(updatedUser).subscribe({
            next: (response) => {
              localStorage.setItem('user', JSON.stringify(response));
              this.router.navigate(['/home/patient/dashboard']);
            },
            error: (error) => {
              console.error('Error updating user:', error);
            },
          });
        } else {
          this.errorMessage = 'Old password is incorrect.';
        }
      },
      error: (error) => {
        console.error('Error validating old password:', error);
        this.errorMessage = 'An error occurred while validating the old password.';
      },
    });
  }

  sendPasswordRecoveryEmail(): void {
    this.userService.sendPasswordRecoveryEmail(this.email).subscribe({
      next: () => {
        alert('Password recovery email sent successfully.');
        this.router.navigate(['/home/reset-password']); // Redirection vers le formulaire de réinitialisation
      },
      error: (error) => {
        console.error('Error sending recovery email:', error);
        alert('An error occurred while sending the recovery email.');
      },
    });
  }

}
