import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-labo-list',
  templateUrl: './labo-list.component.html',
  styleUrls: ['./labo-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class LaboListComponent implements OnInit {
  laboratoires: Laboratoire[] = [];
  filterText = '';

  constructor(private laboratoireService: LaboratoireService) {}

  ngOnInit(): void {
    this.loadLaboratoires();
  }
  loadLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data: any) => {
        console.log('Loaded laboratoires:', data); // Log full response
        this.laboratoires = data._embedded?.laboratories || []; // Map to expected array
        console.log('Extracted laboratoires:', this.laboratoires); // Debug extracted list
      },
      error: (err) => {
        console.error('Failed to load laboratoires:', err);
      },
    });
  }

  search(): void {
    if (this.filterText) {
      this.laboratoires = this.laboratoires.filter((lab) =>
        lab.nom.toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {
      this.loadLaboratoires();
    }
  }
}
