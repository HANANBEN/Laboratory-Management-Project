import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ContactLaboratory} from '../../../models/ConatctLaboratory.model';
import {ContactLaboratoryService} from '../../../services/contactLaboratory-service/contact-laboratory.service';

import { ChangeDetectorRef } from '@angular/core';
import {AdressService} from '../../../services/adress-service/adress-service.service';
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
    private adressService: AdressService, // Inject the AdressService
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
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
          // For each contact, retrieve the address using the fkIdAdress
          this.contactLaboratories.forEach(contact => {
            this.adressService.getAdressById(contact.fkIdAdress).subscribe({
              next: (address) => {
                contact.adress = address;
                console.log(address);// Assign the fetched address to the contact
              },
              error: (err) => {
                console.error('Error fetching address:', err);
              }
            });
          });
          console.log('Contact Laboratories with addresses:', this.contactLaboratories);
        },
        error: (err) => {
          console.error('Error fetching contacts:', err);
        },
      });
    }
  }

  navigateToEdit(contactId: number): void {
    this.router.navigate(['/contact-laboratories/edit-contact-labo', contactId]);
  }

  /*deleteContact(contactId: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactLaboratoryService.deleteContactLaboratory(contactId).subscribe({
        next: () => {
          alert('Contact deleted successfully!');
          this.loadContacts();
        },
        error: (error) => console.error('Error deleting contact:', error),
      });
    }
  }
*/
  addNewContact(): void {
    this.router.navigate(['/contact-laboratories/add-contact-labo'], { queryParams: { labId: this.labId } });

    console.log("seeeeeeeeeeeeeeeeeeee");
    console.log(this.labId);
  }

  navigateToLaboratories(): void {
    this.router.navigate(['/laboratories/list']);
  }

}
