import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactLaboratoryService } from '../../../services/contactLaboratory-service/contact-laboratory.service';
import { ContactLaboratory } from '../../../models/ConatctLaboratory.model';
import { Laboratoire } from '../../../models/laboratoire.model';
import { Adress } from '../../../models/adress.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ContactLaboratoryDTO} from '../../../models/ContactLaboratoryDTO.model';

@Component({
  selector: 'app-create-contact-labo',
  templateUrl: './create-contact-labo.component.html',
  styleUrls: ['./create-contact-labo.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CreateContactLaboComponent implements OnInit {
  contact: ContactLaboratoryDTO = {
    fkIdLaboratory: 0,
    fkIdAdress: 0,
    numTel: '',
    fax: '',
    email: '',
    laboratory: {} as Laboratoire,
    adress: {} as Adress,
  };

  laboratories: Laboratoire[] = [];
  addresses: Adress[] = [];

  constructor(
    private contactService: ContactLaboratoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch unassigned addresses
    this.contactService.getAdressesNotAssigned().subscribe({
      next: (addrs) => {
        this.addresses = addrs;
        console.log('Fetched addresses:', this.addresses); // Log here
      },
      error: (err) => console.error('Error fetching addresses:', err),
    });

    // Fetch unassigned laboratories
    this.contactService.getLaboratoriesNotAssigned().subscribe({
      next: (labo: Laboratoire[]) => {
        this.laboratories = labo;
        console.log('Fetched laboratories:', this.laboratories); // Log here
      },
      error: (err) => console.error('Error fetching laboratories:', err),
    });
  }

  saveContact(): void {
    this.contact.fkIdLaboratory = Number(this.contact.fkIdLaboratory);
    this.contact.fkIdAdress = Number(this.contact.fkIdAdress);

    this.contactService.addContact(this.contact).subscribe({
      next: () => {
        alert('Contact added successfully!');
        this.router.navigate(['/contacts/list']); // Redirect to contact list
      },
      error: (error) => {
        console.error('Error adding contact:', error);
        console.log(this.contact);
        alert('Failed to add contact. Please try again.');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/contact-laboratories/list-all-contacts']);
  }

}
