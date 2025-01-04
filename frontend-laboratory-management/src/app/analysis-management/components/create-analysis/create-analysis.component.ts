import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Analysis } from '../../../models/Analysis.model';
import { TestAnalysis } from '../../../models/TestAnalysis.model';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { TestAnalysisService } from '../../../services/testAnalysis-service/testAnalysis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-analysis.component.html',
  styleUrls: ['./create-analysis.component.css'],
})
export class CreateAnalysisComponent implements OnInit {

  analysis: { laboratory: null; fkLaboratoireId: number; description: string; testAnalysis: any[]; id: number; nom: string } = {
    id: 0,
    fkLaboratoireId: 0,
    nom: '',
    description: '',
    testAnalysis: [],
    laboratory: null,
  };

  laboratories: any[] = [];
  availableTests: TestAnalysis[] = [];
  selectedTests: TestAnalysis[] = []; // Track selected tests

  constructor(
    private analysisService: AnalysisService,
    private laboratoireService: LaboratoireService,
    private testAnalysisService: TestAnalysisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLaboratories();
    this.loadTestAnalysesWithNull();
  }

  loadLaboratories(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data: any) => {
        this.laboratories = data._embedded?.laboratories || [];
      },
      error: (err) => console.error('Failed to load laboratories:', err),
    });
  }

  loadTestAnalysesWithNull(): void {
    this.testAnalysisService.getTestAnalysisWithNullAnalysis().subscribe({
      next: (tests) => {
        // Log the tests data to the console to check its structure and values
        console.log('Loaded test analyses with null analysis:', tests);

        this.availableTests = tests;
      },
      error: (err) => console.error('Failed to load test analyses with null analysis:', err),
    });
  }

  addTest(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const testId = parseInt(selectElement.value, 10); // Get the selected test's ID
    const test = this.availableTests.find((t) => t.id === testId);

    if (test && !this.selectedTests.some((t) => t.id === test.id)) {
      this.selectedTests.push(test); // Add test to the selectedTests array
    }

    selectElement.value = ''; // Reset dropdown selection
  }

  removeTest(index: number): void {
    this.selectedTests.splice(index, 1); // Remove test from selectedTests
  }

  saveAnalysis(): void {
    // Create a new payload excluding the 'id' field
    console.log(this.analysis)
    const { id, ...payload } = this.analysis;

    // Add selected tests to the payload
    payload.testAnalysis = this.selectedTests;

    this.analysisService.createAnalysis(payload).subscribe({
      next: (createdAnalysis) => {
        // Update selected test analyses with the created analysis
        this.selectedTests.forEach((test) => {
          test.analysis = createdAnalysis; // Assign the created analysis to each test
        });

        console.log('Analysis created successfully with associated tests');
        this.router.navigate(['/analyses/list']);
      },
      error: (err) => console.error('Error creating analysis:', err),
    });
  }


  cancel(): void {
    this.router.navigate(['/analyses']);
  }
}


