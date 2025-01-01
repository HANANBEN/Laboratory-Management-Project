import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactLaboratoryService } from '../../../services/contactLaboratory-service/contact-laboratory.service';
import { ContactLaboratory } from '../../../models/ConatctLaboratory.model';
import {AdressService} from '../../../services/adress-service/adress-service.service';
import {LaboratoireService} from '../../../services/labo-service/laboratoire.service';

@Component({
  selector: 'app-list-all-contact-labo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-all-contact-labo.component.html',
  styleUrls: ['./list-all-contact-labo.component.css'],
})
export class ListAllContactLaboComponent implements OnInit {
  contactLaboratories: ContactLaboratory[] = [];
  filterText: string = '';
  filterEmail: string = '';

  constructor(private contactService: ContactLaboratoryService , private addressService: AdressService, private laboratoryService : LaboratoireService ) {}

  ngOnInit(): void {
    this.loadAllContacts();
  }
  loadAllContacts(): void {
    this.contactService.listAllContacts().subscribe(
      (contacts) => {
        this.contactLaboratories = contacts.map((contact) => {
          // Fetch Laboratory
          if (contact.fkIdLaboratory) {
            this.laboratoryService.getLaboratoireById(contact.fkIdLaboratory).subscribe(
              (laboratory) => {
                contact.laboratory = laboratory; // Assign fetched laboratory
              },
              (error) => {
                console.error('Error fetching laboratory:', error);
                (contact.laboratory as any) = null; // Temporarily assert type
              }
            );
          } else {
            (contact.laboratory as any) = null; // Assign null directly
          }

          // Fetch Address
          if (contact.fkIdAdress) {
            this.addressService.getAdressById(contact.fkIdAdress).subscribe(
              (address) => {
                contact.adress = address; // Assign fetched address
              },
              (error) => {
                console.error('Error fetching address:', error);
                (contact.adress as any) = null; // Temporarily assert type
              }
            );
          } else {
            (contact.adress as any) = null; // Assign null directly
          }

          return contact; // Return updated contact
        });
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }



  search(): void {
    this.contactLaboratories = this.contactLaboratories.filter((contact) => {
      const matchesName = contact.laboratory?.nom?.toLowerCase().includes(this.filterText.toLowerCase());
      const matchesEmail = contact.email?.toLowerCase().includes(this.filterEmail.toLowerCase());
      return matchesName || matchesEmail;
    });
  }
}
