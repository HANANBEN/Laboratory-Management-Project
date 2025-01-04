import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpreuveService } from '../../../services/epreuve-service/epreuve.service';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Epreuve } from '../../../models/Epreuve.model';
import { Analysis } from '../../../models/Analysis.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-all-epreuve',
  standalone: true,
  imports : [CommonModule , FormsModule],

  templateUrl: './list-all-epreuve.component.html',
  styleUrl: './list-all-epreuve.component.css'
})
export class ListAllEpreuveComponent implements OnInit {
  analyses: Analysis[] = [];
  epreuves: Epreuve[] = [];
  filteredEpreuves: Epreuve[] = [];
  selectedAnalysisId: number | null = null;

  constructor(
    private epreuveService: EpreuveService,
    private analysisService: AnalysisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllAnalyses()
    this.loadEpreuves();
  }


  loadAllAnalyses(): void {
    this.analysisService.getAllAnalyses().subscribe({
      next: (analyses) => {
        this.analyses = analyses;
        console.log('Loaded analyses:', this.analyses);
      },
      error: (err) => {
        console.error('Error loading analyses:', err);
      },
    });
  }
  loadEpreuves(): void {
    this.epreuveService.getAllEpreuves().subscribe(
      (data) => {
        this.epreuves = data;
        this.filteredEpreuves = data;

        // Fetch analyses for each epreuve, only if fkIdAnalyse is not null
        this.epreuves.forEach((epreuve) => {
          if (epreuve.fkIdAnalyse != null) {
            // Only make the API call if fkIdAnalyse is not null
            this.analysisService.getAnalysisById(epreuve.fkIdAnalyse).subscribe({
              next: (analysis) => {
                epreuve.analysis = analysis ? analysis : null; // Assign analysis or null
              },
              error: (err) => {
                console.error('Failed to fetch analysis', err);
                epreuve.analysis = null; // If error occurs, set analysis to null
              }
            });
          } else {
            // If fkIdAnalyse is null, directly set analysis to null
            epreuve.analysis = null;
          }
        });
      },
      (error) => {
        console.error('Error loading epreuves', error);
      }
    );
  }


  filterByAnalysis(): void {
    if (this.selectedAnalysisId) {
      this.epreuveService.getEpreuvesByAnalysis(this.selectedAnalysisId).subscribe({
        next: (epreuves) => {
          this.filteredEpreuves = epreuves;
          console.log(
            `Filtered epreuves for analysis ID ${this.selectedAnalysisId}:`,
            this.filteredEpreuves
          );
        },
        error: (err) => {
          console.error('Error filtering epreuves:', err);
        },
      });
    } else {
      this.filteredEpreuves = this.epreuves; // Show all if no analysis is selected
    }
  }

  navigateToCreateEpreuve(): void {
    this.router.navigate(['/epreuves/create']);
  }

  navigateToEditEpreuve(epreuveId: number): void {
    this.router.navigate(['/epreuves/edit', epreuveId]);
  }

  deleteEpreuve(epreuveId: number): void {
    if (confirm('Are you sure you want to delete this epreuve?')) {
      this.epreuveService.deleteEpreuve(epreuveId).subscribe({
        next: () => {
          this.loadEpreuves(); // Reload epreuves after deletion
          alert(`Epreuve with ID ${epreuveId} deleted.`);
        },
        error: (err) => {
          console.error('Error deleting epreuve:', err);
          alert('Failed to delete epreuve.');
        },
      });
    }
  }
}
