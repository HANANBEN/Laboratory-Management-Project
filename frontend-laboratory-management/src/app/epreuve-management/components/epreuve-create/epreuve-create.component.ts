import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpreuveService } from '../services/epreuve.service';
import { AnalyseService } from '../services/analyse.service';
import { Epreuve } from '../models/epreuve.model';
import { Analyse } from '../models/analyse.model';

@Component({
  selector: 'app-epreuve-create',
  templateUrl: './epreuve-create.component.html',
  styleUrls: ['./epreuve-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EpreuveCreateComponent implements OnInit {
  newEpreuve: Epreuve = {
    nom: '',
    fkIdAnalyse: 0,
  };

  analyses: Analyse[] = []; // List of analyses to populate the dropdown

  constructor(
    private epreuveService: EpreuveService,
    private analyseService: AnalyseService // Inject AnalyseService
  ) {}

  ngOnInit(): void {
    this.loadAnalyses(); // Fetch analyses on component initialization
  }

  loadAnalyses(): void {
    this.analyseService.getAllAnalyses().subscribe({
      next: (data) => {
        this.analyses = data;
        console.log('Loaded analyses:', this.analyses);
      },
      error: (err) => {
        console.error('Error loading analyses:', err);
      },
    });
  }

  createEpreuve(): void {
    if (this.newEpreuve.fkIdAnalyse=== 0) {
      console.error('Please select an analysis.');
      return;
    }

    this.epreuveService.createEpreuve(this.newEpreuve).subscribe({
      next: (createdEpreuve) => {
        console.log('Epreuve created:', createdEpreuve);
      },
      error: (err) => {
        console.error('Error creating epreuve:', err);
      },
    });
  }
}
