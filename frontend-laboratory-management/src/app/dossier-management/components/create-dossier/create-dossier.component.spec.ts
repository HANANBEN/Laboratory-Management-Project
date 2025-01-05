import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDossierComponent } from './create-dossier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { PatientService } from '../../../services/patient-service/patient.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

const mockPatients = [
  { id: 1, nomComplet: 'John Doe', numPieceIdentite: '12345' },
  { id: 2, nomComplet: 'Jane Smith', numPieceIdentite: '67890' },
];

describe('CreateDossierComponent', () => {
  let component: CreateDossierComponent;
  let fixture: ComponentFixture<CreateDossierComponent>;
  let dossierService: jasmine.SpyObj<DossierService>;
  let patientService: jasmine.SpyObj<PatientService>;

  beforeEach(async () => {
    const dossierServiceSpy = jasmine.createSpyObj('DossierService', ['addDossier']);
    const patientServiceSpy = jasmine.createSpyObj('PatientService', ['getAllPatients']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CreateDossierComponent],
      providers: [
        { provide: DossierService, useValue: dossierServiceSpy },
        { provide: PatientService, useValue: patientServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDossierComponent);
    component = fixture.componentInstance;
    dossierService = TestBed.inject(DossierService) as jasmine.SpyObj<DossierService>;
    patientService = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;

    patientService.getAllPatients.and.returnValue(of(mockPatients));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load patients on init', () => {
    expect(component.dossierForm).toBeDefined();
    expect(component.patients).toEqual(mockPatients);
  });

  it('should display an error message if the form is invalid on submit', () => {
    component.dossierForm.controls['numDossier'].setValue('');
    component.onSubmit();

    expect(component.errorMessage).toBe('Please fill out all required fields correctly.');
  });

  it('should call addDossier and reset form on successful submit', () => {
    const mockDossierPayload = {
      date: '2025-01-01',
      numDossier: 1,
      patientId: 1,
      patient: undefined,
      name: 'Test Dossier',
      fkEmailUtilisateur: 1,
      id: 0,
    };

    dossierService.addDossier.and.returnValue(of(mockDossierPayload));

    component.dossierForm.setValue({
      numDossier: 1,
      date: '2025-01-01',
      name: 'Test Dossier',
      patientId: 1,
      fkEmailUtilisateur: 1,
    });

    component.onSubmit();

    expect(dossierService.addDossier).toHaveBeenCalledWith(mockDossierPayload);
    expect(component.errorMessage).toBe('');
    expect(component.dossierForm.pristine).toBeTrue();
  });

  it('should display an error message if addDossier fails', () => {
    dossierService.addDossier.and.returnValue(throwError(() => new Error('Error adding dossier')));

    component.dossierForm.setValue({
      numDossier: 1,
      date: '2025-01-01',
      name: 'Test Dossier',
      patientId: 1,
      fkEmailUtilisateur: 1,
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Failed to create dossier. Please try again.');
  });

  it('should reset the form when resetForm is called', () => {
    component.dossierForm.setValue({
      numDossier: 1,
      date: '2025-01-01',
      name: 'Test Dossier',
      patientId: 1,
      fkEmailUtilisateur: 1,
    });

    component.resetForm();

    expect(component.dossierForm.value).toEqual({
      numDossier: '',
      date: '',
      name: '',
      patientId: '',
      fkEmailUtilisateur: '',
    });
  });
});
