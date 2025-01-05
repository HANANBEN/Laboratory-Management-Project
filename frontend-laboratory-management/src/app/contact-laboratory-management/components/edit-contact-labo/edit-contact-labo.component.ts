import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactLaboratoryService } from '../../../services/contactLaboratory-service/contact-laboratory.service';
import { LaboratoireService } from '../../../services/labo-service/laboratoire.service';
import { AdressService } from '../../../services/adress-service/adress-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactLaboratoryDTO } from '../../../models/ContactLaboratoryDTO.model';
import { Laboratoire } from '../../../models/laboratoire.model';
import { Adress } from '../../../models/adress.model';

@Component({
  selector: 'app-edit-contact-labo',
  templateUrl: './edit-contact-labo.component.html',
  styleUrls: ['./edit-contact-labo.component.css'],
  imports: [CommonModule, FormsModule],
  standalone:true,
})
export class EditContactLaboComponent implements OnInit {
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
    private addressService: AdressService,
    private laboratoryService: LaboratoireService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.loadContactData(parseInt(contactId, 10));
      this.loadLaboratories();
      this.loadAddresses();
    } else {
      console.error('No contact ID provided for editing.');
      this.router.navigate(['/contacts/list']);
    }
  }

  // Fetch contact data by ID
  loadContactData(id: number): void {
    this.contactService.getContactLaboratoryById(id).subscribe(
      (data: ContactLaboratoryDTO) => {
        this.contact = data;

        // Optionally, pre-select the fkIdLaboratory and fkIdAdress if already assigned
        // These will be pre-filled by the contact data
        if (this.contact.fkIdLaboratory) {
          this.contact.laboratory = this.laboratories.find(
            (lab) => lab.id === this.contact.fkIdLaboratory
          )!;
        }
        if (this.contact.fkIdAdress) {
          this.contact.adress = this.addresses.find(
            (addr) => addr.id === this.contact.fkIdAdress
          )!;
        }
      },
      (error: any) => {
        console.error('Error loading contact:', error);
        this.snackBar.open('Failed to load contact data.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Fetch unassigned laboratories
  loadLaboratories(): void {
    this.contactService.getLaboratoriesNotAssigned().subscribe(
      (data: Laboratoire[]) => {
        this.laboratories = data;
      },
      (error: any) => {
        console.error('Error loading laboratories:', error);
      }
    );
  }

  // Fetch unassigned addresses
  loadAddresses(): void {
    this.contactService.getAdressesNotAssigned().subscribe(
      (data: Adress[]) => {
        this.addresses = data;
        console.log(this.addresses)
      },
      (error: any) => {
        console.error('Error loading addresses:', error);
      }
    );
  }

  // Update contact data
  updateContact(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      const updatedContact: ContactLaboratoryDTO = { ...this.contact };

      this.contactService.updateContactLaboratory(parseInt(contactId, 10), updatedContact).subscribe(
        (response: ContactLaboratoryDTO) => {
          console.log('Contact updated successfully:', response);
          this.snackBar.open('Contact updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/contacts/list']);
        },
        (error: any) => {
          console.error('Error updating contact:', error);
          this.snackBar.open('Failed to update contact.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/contact-laboratories/list-all-contacts']);
  }
}
