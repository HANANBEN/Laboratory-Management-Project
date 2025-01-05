import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../../../services/admin-service/admin-service.service';
import { Utilisateur } from '../../../../../models/utilisateur.model';
import { Router } from '@angular/router';
import {LaboratoireService} from '../../../../../services/labo-service/laboratoire.service';

@Component({
  selector: 'app-list-all-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-all-user-labo.component.html',
  styleUrls: ['./list-all-user-labo.component.css'],
})
export class ListAllUserComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  allUtilisateurs: Utilisateur[] = []; // Store original data
  filterText: string = '';
  filterEmail: string = '';

  constructor(
    private adminService: AdminService,
    private laboratoryService: LaboratoireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.adminService.getUsers().subscribe(
      (users) => {
        console.log('Loaded Users:', users); // Debug loaded data
        this.allUtilisateurs = users;
        this.utilisateurs = [...this.allUtilisateurs];
        console.log('Users for Display:', this.utilisateurs); // Debug display data
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  search(): void {
    this.utilisateurs = this.allUtilisateurs.filter((user) => {
      // Convert filters to lowercase for case-insensitive comparison
      const filterTextLower = this.filterText.toLowerCase();
      const filterEmailLower = this.filterEmail.toLowerCase();

      // Check if user name matches filterText
      const matchesName = !this.filterText ||
        (user.nomComplet?.toLowerCase() || '').includes(filterTextLower);

      // Check if email matches filterEmail
      const matchesEmail = !this.filterEmail ||
        (user.email?.toLowerCase() || '').includes(filterEmailLower);

      // Return true if either condition matches
      return matchesName || matchesEmail;
    });
  }

  createUser(): void {
    this.router.navigate(['/users/create-user']);
  }

  editUser(userId: number): void {
    this.router.navigate(['/users/edit-user', userId]);
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          // Remove the deleted user from the local list
          this.utilisateurs = this.utilisateurs.filter(user => user.id !== userId);
          alert('User deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }
}
