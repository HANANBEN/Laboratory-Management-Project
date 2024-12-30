import { Component } from '@angular/core';
import { Adress } from '../../../models/adress.model';
import { AdressService } from '../../../services/adress-service/adress-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adress-create',
  templateUrl: './adress-create.component.html',
  styleUrl: './adress-create.component.css',
  imports: [CommonModule, FormsModule],
   standalone: true,
})
export class AdressCreateComponent {
  adress: { nomVoie: string; ville: string; numVoie: number; commune: string; codePostal: number } = {
    numVoie: 0,
    nomVoie: '',
    codePostal: 0,
    ville: '',
    commune: '',
  };

  constructor(
    private adressService: AdressService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  createAdress(): void {
    this.adressService.createAdress(this.adress).subscribe(
      (newAdress: Adress) => {
        console.log('Address created successfully:', newAdress);

        // Show success message
        this.snackBar.open('Address created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Navigate to the addresses list
        this.router.navigate(['/adress/list']);
      },
      (error: any) => {
        console.error('Error creating address:', error);

        // Show error message
        this.snackBar.open('Failed to create address. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  navigateToList(){

    this.router.navigate(["/adress/list"])
  }
}
