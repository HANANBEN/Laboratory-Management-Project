import { Component } from '@angular/core';
import {Laboratoire} from '../../../models/laboratoire.model';
import {LaboratoireService} from '../../../services/labo-service/laboratoire.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-labo-create',

  templateUrl: './labo-create.component.html',
  styleUrl: './labo-create.component.css',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class LaboCreateComponent {

  laboratory: Laboratoire = {
    nom: '',
    logo: '',
    nrc: '',
    isActive: false,
    dateActivation: undefined,
  };
  constructor(private laboratoireService: LaboratoireService, private router: Router, private snackBar: MatSnackBar, ) {}





  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput?.files?.length) {
      const file: File = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Assign Base64 string with prefix
          this.laboratory.logo = reader.result;
          if (typeof this.laboratory.logo === "string") {
            const base64Data = this.laboratory.logo.split(',')[1];
            this.laboratory.logo = base64Data;
          } // Remove 'data:image/png;base64,' prefix

        } else {
          console.error('FileReader result is not a string.');
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      // Read file as Base64 string
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected or file input is invalid.');
    }
  }

  createLaboratory(): void {
    this.laboratoireService.createLaboratoire(this.laboratory).subscribe(
      (newLaboratory: Laboratoire) => {
        console.log('Laboratory created successfully:', newLaboratory);

        // Show snackbar
        this.snackBar.open('Laboratory created successfully!', 'Close', {
          duration: 30000,  // The message will be shown for 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Navigate to the laboratories list after successful creation
        this.router.navigate(['/laboratories/list']);
      },
      (error: any) => {
        console.error('Error creating laboratory:', error);

        // Optional: Show an error message in the snackbar if the creation fails
        this.snackBar.open('Failed to create laboratory. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

}
