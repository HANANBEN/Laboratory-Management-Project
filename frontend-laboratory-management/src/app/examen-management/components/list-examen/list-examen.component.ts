import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../../services/examen-service/examen.service';
import { Examen } from '../../../models/Examen.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-examen',
  standalone : true,
  templateUrl: './list-examen.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./list-examen.component.css']
})
export class ListExamenComponent implements OnInit {
  examens: Examen[] = [];

  constructor(private examenService: ExamenService) {}

  ngOnInit(): void {
    this.loadExamens();
  }

  // Load all examens
  loadExamens(): void {
    this.examenService.getAllExamens().subscribe(
      (data) => {
        this.examens = data;
      },
      (error) => {
        console.error('Error fetching examens:', error);
      }
    );
  }

  // Add new Examen
  addNewExamen(): void {
    // Logic for adding new examen
  }

  // View Examen details
  viewExamen(id: number): void {
    // Logic to view examen details
  }

  // Edit Examen details
  editExamen(id: number): void {
    // Logic to edit examen details
  }

  // Delete Examen
  deleteExamen(id: number): void {
    this.examenService.deleteExamen(id).subscribe(
      () => {
        this.loadExamens(); // Reload examens after deletion
      },
      (error) => {
        console.error('Error deleting examen:', error);
      }
    );
  }
}
