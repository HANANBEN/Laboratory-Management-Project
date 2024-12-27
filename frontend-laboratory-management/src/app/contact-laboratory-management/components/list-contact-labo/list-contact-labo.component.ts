import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ContactLaboratory} from '../../../models/ConatctLaboratory.model';
import {ContactLaboratoryService} from '../../../services/contactLaboratory-service/contact-laboratory.service';

import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-list-contact-labo',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './list-contact-labo.component.html',
  styleUrl: './list-contact-labo.component.css'
})
export class ListContactLaboComponent implements OnInit {
  contactLaboratories: ContactLaboratory[] = [];
  labId!: number;
  constructor(
    private contactLaboratoryService: ContactLaboratoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // Add this
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    const labIdParam = this.activatedRoute.snapshot.paramMap.get('labId');
    if (labIdParam) {
      this.labId = +labIdParam;
      this.contactLaboratoryService.listContactLaboratoryByIdLaboratory(this.labId).subscribe({
        next: (contacts) => {
          this.contactLaboratories = contacts;
          console.log('Contact Laboratories:', this.contactLaboratories);
        },
        error: (err) => {
          console.error('Error fetching contacts:', err);
        },
      });
    }
  }


  navigateToEdit(contactId: number): void {
    this.router.navigate([`/edit-contact/${contactId}`]);
  }

  deleteContact(contactId: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      // Implement delete logic if API available
      console.log('Delete contact:', contactId);
    }
  }

}
