import { Component, OnInit } from '@angular/core';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { Dossier } from '../../../models/Dossier.model';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-dossier',
  standalone: true,
  templateUrl: './list-dossier.component.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./list-dossier.component.css']
})
export class ListDossierComponent implements OnInit {
  dossiers: Dossier[] = [];

  constructor(private dossierService: DossierService, private router: Router) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  // Function to load the dossiers from the service
  loadDossiers(): void {
    this.dossierService.listAllDossiers().subscribe(
      (dossiers) => {
        this.dossiers = dossiers;
      },
      (error) => {
        console.error('Error loading dossiers:', error);
      }
    );
  }

  // Function to navigate to the page for viewing a dossier
  viewDossier(numDossier: number): void {
    this.router.navigate(['/dossier', numDossier]);
  }

  // Function to navigate to the page for editing a dossier
  editDossier(numDossier: number): void {
    this.router.navigate(['/dossier/edit', numDossier]);
  }

  // Function to delete a dossier
  deleteDossier(numDossier: number): void {
    if (confirm('Are you sure you want to delete this dossier?')) {
      this.dossierService.deleteDossier(numDossier).subscribe(
        () => {
          this.dossiers = this.dossiers.filter(dossier => dossier.numDossier !== numDossier);
        },
        (error) => {
          console.error('Error deleting dossier:', error);
        }
      );
    }
  }

  // Function to navigate to the page for adding a new dossier
  addNewDossier(): void {
    this.router.navigate(['/dossier/create']);
  }
}
