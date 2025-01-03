import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Analysis } from '../../../models/Analysis.model';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';

@Component({
  selector: 'app-analysis-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.css'],
})
export class AnalysisListComponent implements OnInit {
  analyses: Analysis[] = [];
  labId!: number;

  constructor(
    private analysisService: AnalysisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses(): void {
    const labIdParam = this.activatedRoute.snapshot.paramMap.get('labId');
    if (labIdParam) {
      this.labId = +labIdParam;
      this.analysisService.listAnalysesByLaboratoryId(this.labId).subscribe({
        next: (analyses) => {
          this.analyses = analyses;
          console.log('Loaded analyses:', this.analyses);
        },
        error: (err) => {
          console.error('Error fetching analyses:', err);
        },
      });
    }
  }

  viewTestAnalysis(analysisId: number): void {
    this.router.navigate([`/test-analysis/${analysisId}`]);
  }

  navigateToEditAnalysis(analysisId: number): void {
    this.router.navigate([`/edit-analysis/${analysisId}`]);
  }

  deleteAnalysis(analysisId: number): void {
    if (confirm('Are you sure you want to delete this analysis?')) {
      this.analysisService.deleteAnalysis(analysisId).subscribe({
        next: () => {
          this.loadAnalyses(); // Reload analyses after deletion
          console.log(`Analysis with ID ${analysisId} deleted.`);
        },
        error: (err) => {
          console.error('Error deleting analysis:', err);
        },
      });
    }
  }
}
