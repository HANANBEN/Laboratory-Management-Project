import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: false,
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  email: string = ''; // L'email de l'utilisateur
  resetCode: string = ''; // Code de réinitialisation
  newPassword: string = ''; // Nouveau mot de passe
  errorMessage: string | null = null;
  retypeNewPassword:string='';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.resetCode || !this.newPassword) {
      this.errorMessage = 'Email, reset code, and new password are required.';
      return;
    }

    this.userService.resetPassword(this.email, this.resetCode, this.newPassword).subscribe({
      next: () => {
        alert('Password reset successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error resetting password:', err);
        this.errorMessage = 'Invalid reset code or an error occurred.';
      },
    });
  }

}
