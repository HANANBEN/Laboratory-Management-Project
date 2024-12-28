import { Component, OnInit } from '@angular/core';
import { Laboratoire } from '../../../models/laboratoire.model';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labo-edit',
  templateUrl: './labo-edit.component.html',
  styleUrls: ['./labo-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LaboEditComponent implements OnInit {
  laboratory: Laboratoire = {
    nom: '',
    logo: '',
    nrc: '',
    isActive: false,
    dateActivation: undefined,
  };
  formattedDate: string = '';

  constructor(
    private laboratoireService: LaboratoireService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const laboratoryId = this.route.snapshot.paramMap.get('id');
    if (laboratoryId) {
      this.loadLaboratoryData(parseInt(laboratoryId, 10));
    } else {
      console.error('No laboratory ID provided for editing.');
      this.router.navigate(['/laboratories/list']);
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('File selected:', file);
      // Ajoutez ici la logique de traitement du fichier, par exemple :
      // - Lecture du fichier
      // - Téléchargement vers un serveur
    } else {
      console.error('No file selected or input is invalid.');
    }
  }

  loadLaboratoryData(id: number): void {
    this.laboratoireService.getLaboratoireById(id).subscribe(
      (data: Laboratoire) => {
        this.laboratory = data;
        if (this.laboratory.dateActivation) {
          this.formattedDate = this.formatDateToYYYYMMDD(this.laboratory.dateActivation);
        }
      },
      (error: any) => {
        console.error('Error loading laboratory:', error);
        this.snackBar.open('Failed to load laboratory data.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  formatDateToYYYYMMDD(date: Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  updateDate(newDate: string): void {
    this.formattedDate = newDate;
    this.laboratory.dateActivation = new Date(newDate); // Convert back to Date type
  }

  updateLaboratory(): void {
    const laboratoryId = this.route.snapshot.paramMap.get('id');
    if (laboratoryId) {
      const updatedLaboratory: Laboratoire = {
        ...this.laboratory,
        dateActivation: this.laboratory.dateActivation, // Already a Date object
      };

      this.laboratoireService.updateLaboratoire(parseInt(laboratoryId, 10), updatedLaboratory).subscribe(
        (response: Laboratoire) => {
          console.log('Laboratory updated successfully:', response);
          this.snackBar.open('Laboratory updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/laboratories/list']);
        },
        (error: any) => {
          console.error('Error updating laboratory:', error);
        }
      );
    }
  }
}
