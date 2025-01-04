import { Component, OnInit } from '@angular/core';
import { EpreuveService } from '../../../services/epreuve-service/epreuve.service';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Epreuve } from '../../../models/Epreuve.model';
import { Analysis } from '../../../models/Analysis.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-epreuve-create',
  templateUrl: './epreuve-create.component.html',
  styleUrls: ['./epreuve-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EpreuveCreateComponent implements OnInit {
  newEpreuve: { nom: string; fkIdAnalyse: number } = {
    nom: '',
    fkIdAnalyse: 0
  };

  analyses: Analysis[] = []; // List of analyses
  selectedAnalysisId: number | null = null; // Bind the selected analysis

  constructor(
    private epreuveService: EpreuveService,
    private analysisService: AnalysisService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses(): void {
    this.analysisService.getAllAnalyses().subscribe({
      next: (analyses) => {
        this.analyses = analyses;
      },
      error: (err) => {
        console.error('Error loading analyses:', err);
      }
    });
  }

  saveEpreuve(): void {
    if (this.selectedAnalysisId) {
      this.newEpreuve.fkIdAnalyse = this.selectedAnalysisId; // Assign selected analysis ID
    }

    if (!this.newEpreuve.nom || !this.newEpreuve.fkIdAnalyse) {
      console.error('Epreuve name and analysis are required');
      alert('Epreuve name and associated analysis are required.');
      return;
    }

    this.epreuveService.createEpreuve(this.newEpreuve).subscribe({
      next: (createdEpreuve) => {
        console.log('Epreuve created:', createdEpreuve);
        alert(`Epreuve "${createdEpreuve.nom}" has been successfully created.`);
        this.router.navigate(['/epreuves/list']); // Navigate to the list page
      },
      error: (err) => {
        console.error('Error creating epreuve:', err);
        alert('An error occurred while creating the epreuve. Please try again.');
      }
    });
  }


  cancel(){
    this.router.navigate(['epreuves/list']);
  }

}
