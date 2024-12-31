import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactLaboratoryService } from '../../../services/contactLaboratory-service/contact-laboratory.service';
import { ContactLaboratory } from '../../../models/ConatctLaboratory.model';
import { Laboratoire } from '../../../models/laboratoire.model';
import { Adress } from '../../../models/adress.model';
import {AdressService} from '../../../services/adress-service/adress-service.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-contact-labo',
  templateUrl: './create-contact-labo.component.html',
  styleUrl: './create-contact-labo.component.css',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CreateContactLaboComponent implements OnInit {
  contact: ContactLaboratory = {
    id: 0,
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
    private adresseSevice: AdressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adresseSevice.getAddresses().subscribe((addrs) => {
      this.addresses = addrs;
    });
  }

  saveContact(): void {
    this.contactService.addContact(this.contact).subscribe({
      next: (response) => {
        alert('Contact added successfully!');
        this.router.navigate(['/contact-laboratories']);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to add contact. Please try again.');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/contact-laboratories']);
  }
}
