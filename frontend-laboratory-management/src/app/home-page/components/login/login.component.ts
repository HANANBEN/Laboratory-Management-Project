import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { Utilisateur } from '../../../models/utilisateur.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css'], // Correction ici
})
export class LoginComponent implements OnInit {
  userSpace: string = ''; // Utilisation de `string` au lieu de `String`
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private userService: UserService, // Inject UserService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer les query params
    this.route.queryParams.subscribe((params) => {
      this.userSpace = params['userSpace'] || ''; // 'patient', 'admin', ou 'technicien'
    });
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Response from API:', response); // Inspecte la réponse

        // Sauvegarde des informations dans localStorage
        localStorage.setItem('role', response.role);
        localStorage.setItem('nomComplet', response.nomComplet);
        localStorage.setItem('email', response.email);

        // Redirection selon le rôle
        if (response.role === 'admin') {
          this.router.navigate(['/home/admin/dashboard']);
        } else if (response.role === 'technicien') {
          this.router.navigate(['/home/technician/dashboard']);
        } else if (response.role === 'patient') {
          this.router.navigate(['/home/patient/dashboard']);
        } else {
          this.errorMessage = 'Unknown role';
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        console.error(err);
      },
    });
  }

}
