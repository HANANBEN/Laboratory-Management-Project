import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDossierComponent } from './edit-dossier.component';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { PatientService } from '.././../../services/patient-service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Dossier } from '../../../models/Dossier.model';
import { Patient } from '../../../models/Patient.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditDossierComponent', () => {
  let component: EditDossierComponent;
  let fixture: ComponentFixture<EditDossierComponent>;
  let dossierService: DossierService;
  let patientService: PatientService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDossierComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        DossierService,
        PatientService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDossierComponent);
    component = fixture.componentInstance;
    dossierService = TestBed.inject(DossierService);
    patientService = TestBed.inject(PatientService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the dossier and patients on init', () => {
    const dossier: Dossier = {
      numDossier: 1,
      patient: {} as Patient,
      fkEmailUtilisateur: 1,
      date: '2024-01-04',
    };
    const patients: Patient[] = [
      { id: 1, nomComplet: 'John Doe', dateNaissance: '1990-01-01', lieuDeNaissance: '', sexe: '', typePieceIdentite: '', numPieceIdentite: '', adresse: '', numTel: '', email: '', visiblePour: '', numDossier: '' },
    ];

    spyOn(dossierService, 'getDossierById').and.returnValue(of(dossier));
    spyOn(patientService, 'getAllPatients').and.returnValue(of(patients));

    component.ngOnInit();

    expect(dossierService.getDossierById).toHaveBeenCalledWith(1);
    expect(patientService.getAllPatients).toHaveBeenCalled();
    expect(component.dossier).toEqual(dossier);
    expect(component.patients).toEqual(patients);
  });

  it('should handle updateDossier success', () => {
    spyOn(dossierService, 'updateDossier').and.returnValue(of({} as Dossier));
    spyOn(router, 'navigate');

    component.updateDossier();

    expect(dossierService.updateDossier).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dossiers']);
  });

  it('should handle updateDossier error', () => {
    spyOn(dossierService, 'updateDossier').and.returnValue(throwError(() => new Error('Error updating dossier')));
    spyOn(console, 'error');

    component.updateDossier();

    expect(console.error).toHaveBeenCalledWith('Error updating dossier', jasmine.any(Error));
  });

  it('should navigate to dossiers on cancel', () => {
    spyOn(router, 'navigate');

    component.cancelEdit();

    expect(router.navigate).toHaveBeenCalledWith(['/dossiers']);
  });
});
