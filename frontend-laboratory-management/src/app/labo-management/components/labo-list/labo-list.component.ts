import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

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
  allLaboraties: Laboratoire[] = [];
  filterStatus: string = ''; // Status filter
  filterDateActivation: string = ''; // Date filter


  constructor(private laboratoireService: LaboratoireService , private router: Router) {

  }

  ngOnInit(): void {
    this.loadLaboratoires();
  }

  loadLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data: any) => {
        console.log('Loaded laboratoires:', data); // Log full response
        this.allLaboraties = data._embedded?.laboratories || []; // Store original data
        this.laboratoires = [...this.allLaboraties]; // Initialize display list
        console.log('Extracted laboratoires:', this.laboratoires); // Debug extracted list
      },
      error: (err) => {
        console.error('Failed to load laboratoires:', err);
        this.laboratoires = [...this.allLaboraties];
      },
    });
  }

  search(): void {
    this.laboratoires = this.allLaboraties.filter((lab) => {
      // Filter by name (case-insensitive)
      const matchesName = !this.filterText || lab.nom.toLowerCase().includes(this.filterText.toLowerCase());

      // Filter by status (active or inactive)
      const matchesStatus =
        !this.filterStatus || (this.filterStatus === 'active' && lab.isActive) || (this.filterStatus === 'inactive' && !lab.isActive);

      // Filter by activation date (string comparison of YYYY-MM-DD format)
      const matchesDate = !this.filterDateActivation ||
        (lab.dateActivation && this.dateToString(lab.dateActivation) === this.filterDateActivation);

      return matchesName && matchesStatus && matchesDate;
    });
  }
  navigateToEdit(id: string | undefined): void {
    if (id) {  // Ensure id is not undefined
      this.router.navigate(['/laboratories/edit', id]);  // Pass the ID as a route parameter
    } else {
      console.error('ID is undefined');
    }
  }

  dateToString(date: any): string {
    // Ensure date is a Date object
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
      return ''; // Return an empty string if date is invalid
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  navigateToCreate() {
    this.router.navigate(['/laboratories/create']);
  }

}


