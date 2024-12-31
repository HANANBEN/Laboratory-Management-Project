import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // Récupère le rôle attendu depuis les données de la route
    const userRole = this.authService.getUserRole(); // Supposons que vous ayez une méthode pour obtenir le rôle de l'utilisateur

    if (userRole === expectedRole) {
      return true; // Autorise la navigation si le rôle correspond
    } else {
      this.router.navigate(['/home']); // Redirige vers la page "home" si non autorisé
      return false;
    }
  }
}
