import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { PatientService } from '../../../services/patient-service/patient.service';
import { Patient } from '../../../models/Patient.model';

@Component({
  selector: 'app-create-dossier',
  standalone: true,
  templateUrl: './create-dossier.component.html',
  styleUrls: ['./create-dossier.component.css'],
})
export class CreateDossierComponent implements OnInit {
  dossierForm!: FormGroup;
  patients: Patient[] = [];
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dossierService: DossierService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPatients();
  }

  private initForm(): void {
    this.dossierForm = this.fb.group({
      numDossier: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      name: ['', Validators.required],
      patientId: ['', Validators.required],
      fkEmailUtilisateur: ['', Validators.required],
    });
  }

  private loadPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
      },
      (error) => {
        console.error('Error fetching patients:', error);
        this.errorMessage = 'Unable to load patients. Please try again later.';
      }
    );
  }

  onSubmit(): void {
    if (this.dossierForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    this.isSubmitting = true;

    const formValues = this.dossierForm.value;

    const dossierPayload = {
      date: formValues.date,
      numDossier: +formValues.numDossier,
      patientId: +formValues.patientId,
      patient: undefined,
      name: formValues.name,
      fkEmailUtilisateur: +formValues.fkEmailUtilisateur,
      id: 0,
    };

    this.dossierService
      .addDossier(dossierPayload)
      .subscribe(
        (createdDossier) => {
          console.log('Dossier created successfully:', createdDossier);
          alert('Dossier created successfully!');
          this.resetForm();
        },
        (error) => {
          console.error('Error creating dossier:', error);
          this.errorMessage = 'Failed to create dossier. Please try again.';
        }
      )
      .add(() => {
        this.isSubmitting = false;
      });
  }

  resetForm(): void {
    this.dossierForm.reset();
    this.errorMessage = '';
  }
}
