import { Component, OnInit } from '@angular/core';
import { Adress } from '../../../models/adress.model';
import { AdressService } from '../../../services/adress-service/adress-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adress-edit',
  templateUrl: './adress-edit.component.html',
  styleUrls: ['./adress-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdressEditComponent implements OnInit {
  address: Adress = {
    id: 0,
    numVoie: 0,
    nomVoie: '',
    codePostal: 0,
    ville: '',
    commune: '',
  };

  constructor(
    private adressService: AdressService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const addressId = this.route.snapshot.paramMap.get('id');
    if (addressId) {
      this.loadAddressData(parseInt(addressId, 10));
    } else {
      console.error('No address ID provided for editing.');
      this.router.navigate(['/addresses/list']);
    }
  }

  loadAddressData(id: number): void {
    this.adressService.getAdressById(id).subscribe(
      (data: Adress) => {
        this.address = data;
      },
      (error: any) => {
        console.error('Error loading address:', error);
        this.snackBar.open('Failed to load address data.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  updateAddress(): void {
    const addressId = this.route.snapshot.paramMap.get('id');
    if (addressId) {
      const updatedAddress: Adress = {
        ...this.address,
      };

      this.adressService.updateAdress(parseInt(addressId, 10), updatedAddress).subscribe(
        (response: Adress) => {
          console.log('Address updated successfully:', response);
          this.snackBar.open('Address updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/adress/list']);
        },
        (error: any) => {
          console.error('Error updating address:', error);
        }
      );
    }

  }
  navigateToList(){

    this.router.navigate(["/adress/list"])
  }
}
