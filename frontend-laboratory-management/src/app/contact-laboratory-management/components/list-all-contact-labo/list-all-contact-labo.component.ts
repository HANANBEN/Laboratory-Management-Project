import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactLaboratoryService } from '../../../services/contactLaboratory-service/contact-laboratory.service';
import { ContactLaboratory } from '../../../models/ConatctLaboratory.model';
import { AdressService } from '../../../services/adress-service/adress-service.service';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-all-contact-labo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-all-contact-labo.component.html',
  styleUrls: ['./list-all-contact-labo.component.css'],
})
export class ListAllContactLaboComponent implements OnInit {
  contactLaboratories: ContactLaboratory[] = [];
  allContactLaboratories: ContactLaboratory[] = []; // Store original data
  filterText: string = '';
  filterEmail: string = '';

  constructor(
    private contactService: ContactLaboratoryService,
    private addressService: AdressService,
    private laboratoryService: LaboratoireService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadAllContacts();
  }

  loadAllContacts(): void {
    this.contactService.listAllContacts().subscribe(
      (contacts) => {
        console.log('Loaded Contacts:', contacts); // Debug loaded data
        this.allContactLaboratories = contacts.map((contact) => {
          if (contact.fkIdLaboratory) {
            this.laboratoryService.getLaboratoireById(contact.fkIdLaboratory).subscribe(
              (laboratory) => {
                contact.laboratory = laboratory;
              },
              (error) => {
                console.error('Error fetching laboratory:', error);
                (contact.laboratory as any) = null;
              }
            );
          } else {
            (contact.laboratory as any) = null;
          }

          if (contact.fkIdAdress) {
            this.addressService.getAdressById(contact.fkIdAdress).subscribe(
              (address) => {
                contact.adress = address;
              },
              (error) => {
                console.error('Error fetching address:', error);
                (contact.adress as any) = null;
              }
            );
          } else {
            (contact.adress as any) = null;
          }

          return contact;
        });

        this.contactLaboratories = [...this.allContactLaboratories];
        console.log('Contact Laboratories for Display:', this.contactLaboratories); // Debug display data
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  search(): void {
    this.contactLaboratories = this.allContactLaboratories.filter((contact) => {
      // Convert filters to lowercase for case-insensitive comparison
      const filterTextLower = this.filterText.toLowerCase();
      const filterEmailLower = this.filterEmail.toLowerCase();

      // Check if laboratory name matches filterText
      const matchesName = !this.filterText ||
        (contact.laboratory?.nom?.toLowerCase() || '').includes(filterTextLower);

      // Check if email matches filterEmail
      const matchesEmail = !this.filterEmail ||
        (contact.email?.toLowerCase() || '').includes(filterEmailLower);

      // Return true if either condition matches
      return matchesName || matchesEmail;
    });
  }


  createContactLaboratory(): void {
    this.router.navigate(['/contact-laboratories/create-contact-labo']);
  }

  editContact(contactId: number): void {
    this.router.navigate(['/contact-laboratories/edit-contact-labo', contactId]);
  }

  deleteContact(contactId: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(contactId).subscribe({
        next: () => {
          // Remove the deleted contact from the local list
          this.contactLaboratories = this.contactLaboratories.filter(contact => contact.id !== contactId);
          alert('Contact deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          alert('Failed to delete contact. Please try again.');
        }
      });
    }
  }




}
