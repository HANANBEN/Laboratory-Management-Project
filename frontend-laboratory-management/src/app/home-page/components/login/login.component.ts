import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { Utilisateur} from '../../../models/utilisateur.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false,
  styleUrls: ['./login.component.css'] // Correction ici
})
export class LoginComponent implements OnInit {
  userSpace: string = ''; // Utilisation de `string` au lieu de `String`
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer les query params
    this.route.queryParams.subscribe(params => {
      this.userSpace = params['userSpace'] || ''; // 'patient', 'admin', ou 'technicien'
    });
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: Utilisateur) => {
        console.log('Response from API:', response); // Inspecter la réponse

        const role = response.role; // Assurez-vous que c'est bien "role" et pas autre chose comme `response.user.role`

        if (role === 'admin') {
          this.router.navigate(['/home/admin/dashboard']);
        } else if (role === 'technicien') {
          this.router.navigate(['/home/technician/dashboard']);
        } else if (role === 'patient') {
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
