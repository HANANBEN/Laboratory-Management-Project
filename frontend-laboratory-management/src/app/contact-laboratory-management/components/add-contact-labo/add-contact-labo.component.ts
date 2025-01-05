import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactLaboratoryService } from '../../../services/contactLaboratory-service/contact-laboratory.service';
import { ContactLaboratory } from '../../../models/ConatctLaboratory.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-contact-labo',
  templateUrl: './add-contact-labo.component.html',
  styleUrls: ['./add-contact-labo.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AddContactLaboComponent implements OnInit {

  labId!: number;
  contactsWithNullLaboratory: ContactLaboratory[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactLaboratoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Retrieve labId from query parameter or route parameter
    this.route.queryParams.subscribe(params => {
      this.labId = +params['labId'];
      if (!this.labId) {
        // If labId is not found in query params, retrieve it from route params (if necessary)
        this.route.paramMap.subscribe(paramMap => {
          this.labId = +paramMap.get('labId')!;
        });
      }
      this.loadContactsWithNullLaboratory();
    });
  }

  // Fetch contacts with null fkIdLaboratory
  loadContactsWithNullLaboratory(): void {
    this.contactService.getContactsWithNullLaboratory().subscribe(
      (contacts) => {
        this.contactsWithNullLaboratory = contacts;
      },
      (error) => {
        console.error('Error loading contacts with null laboratory:', error);
      }
    );
  }

  // Assign the labId to a contact and update the contact
  assignLaboratory(contactId: number): void {
    const contact = this.contactsWithNullLaboratory.find(c => c.id === contactId);
    if (contact) {
      contact.fkIdLaboratory = this.labId;  // Assign the laboratory ID
      this.contactService.updateContactLaboratory(contact.id, contact).subscribe(
        (updatedContact) => {
          console.log('Laboratory assigned successfully to contact:', updatedContact);
          this.loadContactsWithNullLaboratory(); // Refresh the list after assignment
        },
        (error) => {
          console.error('Error assigning laboratory:', error);
        }
      );
    }
  }
  navigateToLaboratories(): void {
    this.router.navigate(['/laboratories/list']);
  }
  createNewContact(): void {
    this.router.navigate(['contact-laboratories/create-contact-labo']);

    console.log(this.labId);
  }
}
