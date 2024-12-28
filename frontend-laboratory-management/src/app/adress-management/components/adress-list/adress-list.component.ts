import { Component, OnInit } from '@angular/core';
import { AdressService } from '../../../services/adress-service/adress-service.service';
import { Adress } from '../../../models/adress.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adress-list',
  templateUrl: './adress-list.component.html',
  styleUrls: ['./adress-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AdressListComponent implements OnInit {
  addresses: Adress[] = [];
  filterStreetName = '';
  allAddresses: Adress[] = [];
  filterCity: string = ''; // City filter
  filterPostalCode: string = ''; // Postal code filter

  constructor(private adressService: AdressService, private router: Router) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.adressService.getAddresses().subscribe({
      next: (addresses) => {
        console.log('Raw API response:', addresses); // Debug API response
        this.allAddresses = addresses; // Assign the data
        this.addresses = [...this.allAddresses]; // Initialize display list
        console.log('Addresses loaded:', this.addresses); // Debugging
      },
      error: (err) => {
        console.error('Failed to load addresses:', err);
        this.addresses = [];
      },
    });

  }

  search(): void {
    this.addresses = this.allAddresses.filter((address) => {
      // Filter by street name (case-insensitive)
      const matchesStreetName =
        !this.filterStreetName || address.nomVoie.toLowerCase().includes(this.filterStreetName.toLowerCase());

      // Filter by city (case-insensitive)
      const matchesCity = !this.filterCity || address.ville.toLowerCase().includes(this.filterCity.toLowerCase());

      // Filter by postal code
      const matchesPostalCode =
        !this.filterPostalCode || address.codePostal.toString().includes(this.filterPostalCode);

      return matchesStreetName && matchesCity && matchesPostalCode;
    });
  }

  navigateToEdit(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/addresses/edit', id]); // Pass the ID as a route parameter
    } else {
      console.error('ID is undefined');
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/addresses/create']);
  }
}
