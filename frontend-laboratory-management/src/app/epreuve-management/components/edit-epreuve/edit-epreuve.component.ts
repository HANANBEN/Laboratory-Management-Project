import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuveService } from '../../../services/epreuve-service/epreuve.service';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Epreuve } from '../../../models/Epreuve.model';
import { Analysis } from '../../../models/Analysis.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-epreuve',
  templateUrl: './edit-epreuve.component.html',
  styleUrls: ['./edit-epreuve.component.css'],
  standalone:true,
  imports:[CommonModule , FormsModule]
})
export class EditEpreuveComponent implements OnInit {
  epreuve: Epreuve = {
    id: undefined,
    nom: '',
    fkIdAnalyse: 0,
    analysis: {} as Analysis,
  };
  analyses: Analysis[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private epreuveService: EpreuveService,
    private analysisService: AnalysisService
  ) {}

  ngOnInit(): void {
    const epreuveId = this.route.snapshot.params['id'];
    if (epreuveId) {
      this.loadEpreuve(epreuveId);
    }
    this.loadAnalyses();
  }

  // Load the epreuve to edit
  loadEpreuve(id: number): void {
    this.epreuveService.getEpreuveById(id).subscribe({
      next: (epreuve) => {
        this.epreuve = epreuve;
        console.log('Loaded epreuve:', this.epreuve);
      },
      error: (err) => {
        console.error('Error loading epreuve:', err);
        alert('Failed to load epreuve. Please try again.');
        this.router.navigate(['/epreuves/list']);
      },
    });
  }

  // Load all analyses for the dropdown
  loadAnalyses(): void {
    this.analysisService.getAllAnalyses().subscribe({
      next: (analyses) => {
        this.analyses = analyses;
        console.log('Loaded analyses:', this.analyses);
      },
      error: (err) => {
        console.error('Error loading analyses:', err);
        alert('Failed to load analyses. Please try again.');
      },
    });
  }

  // Save changes to the epreuve
  updateEpreuve(): void {
    if (!this.epreuve.nom || !this.epreuve.fkIdAnalyse) {
      alert('Epreuve name and associated analysis are required.');
      return;
    }

    if (this.epreuve.id) {
      this.epreuveService.updateEpreuve(this.epreuve.id, this.epreuve).subscribe({
        next: (updatedEpreuve) => {
          console.log('Epreuve updated:', updatedEpreuve);
          alert(`Epreuve "${updatedEpreuve.nom}" updated successfully.`);
          this.router.navigate(['/epreuves/list']);
        },
        error: (err) => {
          console.error('Error updating epreuve:', err);
          alert('Failed to update the epreuve. Please try again.');
        },
      });
    }
  }

  // Navigate back to the list
  cancel(): void {
    this.router.navigate(['/epreuves/list']);
  }
}
