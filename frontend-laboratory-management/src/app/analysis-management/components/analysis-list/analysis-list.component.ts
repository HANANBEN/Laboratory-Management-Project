import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Laboratoire } from '../../../models/laboratoire.model';
import { Analysis } from '../../../models/Analysis.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.css'],
  standalone:true,
  imports: [CommonModule , FormsModule]
})
export class AnalysisListComponent implements OnInit {
  laboratories: Laboratoire[] = [];
  analyses: Analysis[] = [];
  filteredAnalyses: Analysis[] = [];
  selectedLabId: number | null = null;

  constructor(
    private laboratoireService: LaboratoireService,
    private analysisService: AnalysisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLaboratories();
    this.loadAllAnalyses();
  }

  loadLaboratories(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data: any) => {
        console.log('Loaded laboratoires:', data); // Log full response
        this.laboratories = data._embedded?.laboratories || []; // Store original data
        console.log('Extracted laboratoires:', this.laboratories); // Debug extracted list
      },
      error: (err) => {
        console.error('Failed to load laboratoires:', err);
      },
    });
  }
  loadAllAnalyses(): void {
    this.analysisService.getAllAnalyses().subscribe({
      next: (analyses) => {
        this.analyses = analyses.map((analysis) => ({
          ...analysis,
          laboratory: undefined, // Temporarily assign undefined
        }));

        // Fetch laboratories for each analysis and populate the `laboratory` field
        this.analyses.forEach((analysis) => {
          if (analysis.fkLaboratoireId) {
            this.laboratoireService.getLaboratoireById(analysis.fkLaboratoireId).subscribe({
              next: (lab) => {
                analysis.laboratory = lab; // Populate laboratory
                this.filteredAnalyses = [...this.analyses]; // Update filtered list
              },
              error: (err) => {
                console.error(`Error fetching laboratory for analysis ID ${analysis.id}:`, err);
              },
            });
          }
        });

        console.log('Loaded analyses:', this.analyses);
      },
      error: (err) => {
        console.error('Error loading analyses:', err);
      },
    });
  }



  filterByLaboratory(): void {
    if (this.selectedLabId) {
      this.analysisService.getAnalysesByLaboratoryId(this.selectedLabId).subscribe({
        next: (analyses) => {
          this.filteredAnalyses = analyses;
          console.log(
            `Filtered analyses for lab ID ${this.selectedLabId}:`,
            this.filteredAnalyses
          );
        },
        error: (err) => {
          console.error('Error filtering analyses:', err);
        },
      });
    } else {
      this.filteredAnalyses = this.analyses; // Show all if no lab is selected
    }
  }

  navigateToCreateAnalysis(): void {
    this.router.navigate(['/analyses/create']);
  }

  navigateToEditAnalysis(analysisId: number): void {
    this.router.navigate(['analyses/edit',analysisId]);
  }

  deleteAnalysis(analysisId: number): void {
    if (confirm('Are you sure you want to delete this analysis?')) {
      this.analysisService.deleteAnalysis(analysisId).subscribe({
        next: () => {
          this.loadAllAnalyses(); // Reload analyses after deletion
          alert(`Analysis with ID ${analysisId} deleted.`);
        },
        error: (err) => {
          console.error('Error deleting analysis:', err);
          alert('Failed to delete analysis.');
        },
      });
    }
  }
}
